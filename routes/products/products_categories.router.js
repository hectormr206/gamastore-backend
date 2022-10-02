const express = require('express');
const passport = require('passport');

const ProductCategoryService = require('../../services/product/product_category.service');
const validatorHandler = require('../../middlewares/validator.handler');
const { checkRoles } = require('../../middlewares/auth.handler');
const {
  getProductCategorySchema,
  createProductCategorySchema,
  updateProductCategorySchema,
} = require('../../schemas/product/product_category.schema');

const router = express.Router();
const service = new ProductCategoryService();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    // #swagger.tags = ['Products (Brands)']
    // #swagger.summary = 'Get all brands'
    /* #swagger.security = [{
      "bearerAuth": []
    }] */
    try {
      const data = await service.find();
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getProductCategorySchema, 'params'),
  async (req, res, next) => {
    // #swagger.tags = ['Products (Brands)']
    // #swagger.summary = 'Get brand by ID'
    /* #swagger.security = [{
      "bearerAuth": []
    }] */
    try {
      const { id } = req.params;
      const data = await service.findOne(id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(createProductCategorySchema, 'body'),
  async (req, res, next) => {
    // #swagger.tags = ['Products (Brands)']
    // #swagger.summary = 'Create new brand'
    /* #swagger.security = [{
      "bearerAuth": []
    }] */
    /* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/definitions/ProductCategory" },
          examples: {
            'ProductCategory': { $ref: "#/components/examples/ProductCategory" }
          }
        }
      }
    } */
    try {
      const body = req.body;
      const newData = await service.create(body);
      res.status(201).json(newData);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getProductCategorySchema, 'params'),
  validatorHandler(updateProductCategorySchema, 'body'),
  async (req, res, next) => {
    // #swagger.tags = ['Products (Brands)']
    // #swagger.summary = 'Update brand by ID'
    /* #swagger.security = [{
      "bearerAuth": []
    }] */
    /* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/definitions/ProductCategory" },
          examples: {
            ProductCategory: { $ref: "#/components/examples/ProductCategory" }
          }
        }
      }
    } */
    try {
      const { id } = req.params;
      const body = req.body;
      const data = await service.update(id, body);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
