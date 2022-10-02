const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();

const getProductBrandSchema = Joi.object({
  id: id.required(),
});

const createProductBrandSchema = Joi.object({
  name: name.required(),
});

const updateProductBrandSchema = Joi.object({
  name,
});

module.exports = {
  getProductBrandSchema,
  createProductBrandSchema,
  updateProductBrandSchema,
};
