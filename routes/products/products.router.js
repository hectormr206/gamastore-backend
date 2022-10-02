const express = require('express');
const passport = require('passport');

const ProductService = require('../../services/product/product.service');
const validatorHandler = require('../../middlewares/validator.handler');
const { checkRoles } = require('../../middlewares/auth.handler');
const {
  getProductSchema,
  createProductSchema,
  updateProductSchema,
} = require('../../schemas/product/product.schema');

const router = express.Router();
const service = new ProductService();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    // #swagger.tags = ['Products']
    // #swagger.summary = 'Get all products'
    /* #swagger.security = [{
      "bearerAuth": []
    }] */
    try {
      const data = await service.find(req.query);
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
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    // #swagger.tags = ['Products']
    // #swagger.summary = 'Get product by ID'
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
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    // #swagger.tags = ['Products']
    // #swagger.summary = 'Create new product'
    /* #swagger.security = [{
      "bearerAuth": []
    }] */
    /* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/definitions/Product" },
          examples: {
            'Product': { $ref: "#/components/examples/Product" }
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
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    // #swagger.tags = ['Products']
    // #swagger.summary = 'Update product by ID'
    /* #swagger.security = [{
      "bearerAuth": []
    }] */
    /* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/definitions/Product" },
          examples: {
            Product: { $ref: "#/components/examples/Product" }
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
