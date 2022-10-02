const boom = require('@hapi/boom');

const { models } = require('../../libs/sequelize');

class UserService {
  async find() {
    const users = await models.User.findAll({
      include: ['userDetails'],
    });
    return users;
  }

  async findByUserName(username) {
    const user = await models.User.findOne({
      where: { username },
    });
    return user;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id, {
      include: ['userDetails'],
    });
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async create(data) {
    const newUser = await models.User.create({
      ...data,
    });
    return newUser;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
