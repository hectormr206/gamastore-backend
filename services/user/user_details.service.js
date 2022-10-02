const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('../../libs/sequelize');

class UserDetailsService {
  async find() {
    const userDetails = await models.UserDetails.findAll({
      include: ['user'],
    });
    return userDetails;
  }

  async findOne(id) {
    const userDetails = await models.UserDetails.findByPk(id, {
      include: ['user'],
    });
    if (!userDetails) {
      throw boom.notFound('User details not found');
    }
    return userDetails;
  }

  async create(data) {
    const hash = await bcrypt.hashSync(data.user.password, 10);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash,
      },
    };
    const newUserDetails = await models.UserDetails.create(newData, {
      include: ['user'],
    });
    delete newUserDetails.dataValues.user.dataValues.password;
    return newUserDetails;
  }

  async update(id, changes) {
    const userDetails = await this.findOne(id);
    const rta = await userDetails.update(changes);
    return rta;
  }

  async delete(id) {
    const userDetails = await this.findOne(id);
    await userDetails.destroy();
    return { id };
  }
}

module.exports = UserDetailsService;
