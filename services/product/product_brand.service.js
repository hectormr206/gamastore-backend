const boom = require('@hapi/boom');

const { models } = require('../../libs/sequelize');

class ProductBrandService {
  async find() {
    const options = {
      where: {},
      order: [['name', 'ASC']],
    };
    const rta = await models.ProductBrand.findAll(options);
    return rta;
  }

  async findOne(id) {
    const options = {
      include: ['products'],
      where: {},
    };
    const rta = await models.ProductBrand.findByPk(id, options);
    if (!rta) {
      throw boom.notFound('Product brand not found');
    }
    return rta;
  }

  async create(data) {
    const newData = await models.ProductBrand.create(data);
    return newData;
  }

  async update(id, changes) {
    const data = await this.findOne(id);
    const rta = await data.update(changes);
    return rta;
  }
}

module.exports = ProductBrandService;
