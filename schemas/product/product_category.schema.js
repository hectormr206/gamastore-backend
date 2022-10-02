const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();

const getProductCategorySchema = Joi.object({
  id: id.required(),
});

const createProductCategorySchema = Joi.object({
  name: name.required(),
});

const updateProductCategorySchema = Joi.object({
  name,
});

module.exports = {
  getProductCategorySchema,
  createProductCategorySchema,
  updateProductCategorySchema,
};
