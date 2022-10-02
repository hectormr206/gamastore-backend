const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const universalCode = Joi.string();
const productBrandId = Joi.number().integer();
const productCategoryId = Joi.number().integer();
const productMeasureId = Joi.number().integer();

const getProductSchema = Joi.object({
  id: id.required(),
});

const createProductSchema = Joi.object({
  name: name.required(),
  universalCode: universalCode.required(),
  productBrandId: productBrandId.required(),
  productCategoryId: productCategoryId.required(),
  productMeasureId: productMeasureId.required(),
});

const updateProductSchema = Joi.object({
  name,
  universalCode,
  productBrandId,
  productCategoryId,
  productMeasureId,
});

module.exports = {
  getProductSchema,
  createProductSchema,
  updateProductSchema,
};
