const express = require('express');
const passport = require('passport');

const ProductBrandService = require('../../services/product/product_brand.service');
const validatorHandler = require('../../middlewares/validator.handler');
const { checkRoles } = require('../../middlewares/auth.handler');
const {
  getProductBrandSchema,
  createProductBrandSchema,
  updateProductBrandSchema,
} = require('../../schemas/product/product_brand.schema');

const router = express.Router();
const service = new ProductBrandService();

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
  validatorHandler(getProductBrandSchema, 'params'),
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
  validatorHandler(createProductBrandSchema, 'body'),
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
          schema: { $ref: "#/definitions/ProductBrand" },
          examples: {
            'ProductBrand': { $ref: "#/components/examples/ProductBrand" }
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
  validatorHandler(getProductBrandSchema, 'params'),
  validatorHandler(updateProductBrandSchema, 'body'),
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
          schema: { $ref: "#/definitions/ProductBrand" },
          examples: {
            ProductBrand: { $ref: "#/components/examples/ProductBrand" }
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
