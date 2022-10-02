const boom = require('@hapi/boom');

const { models } = require('../../libs/sequelize');

class ProductService {
  async find() {
    const options = {
      include: ['productBrand', 'productCategory', 'productMeasure'],
      where: {},
      order: [['name', 'ASC']],
    };
    const rta = await models.Product.findAll(options);
    return rta;
  }

  async findOne(id) {
    const options = {
      include: ['productBrand', 'productCategory', 'productMeasure'],
      where: {},
    };
    const rta = await models.Product.findByPk(id, options);
    if (!rta) {
      throw boom.notFound('Product not found');
    }
    return rta;
  }

  async create(data) {
    const newData = await models.Product.create(data);
    return newData;
  }

  async update(id, changes) {
    const data = await this.findOne(id);
    const rta = await data.update(changes);
    return rta;
  }
}

module.exports = ProductService;
