const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();

const getProductMeasureSchema = Joi.object({
  id: id.required(),
});

const createProductMeasureSchema = Joi.object({
  name: name.required(),
});

const updateProductMeasureSchema = Joi.object({
  name,
});

module.exports = {
  getProductMeasureSchema,
  createProductMeasureSchema,
  updateProductMeasureSchema,
};
