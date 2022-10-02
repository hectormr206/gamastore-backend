const express = require('express');
const passport = require('passport');

const UserDetailsService = require('../../services/user/user_details.service');
const validatorHandler = require('../../middlewares/validator.handler');
const { checkRoles } = require('../../middlewares/auth.handler');
const {
  getUserDetailsSchema,
  createUserDetailsSchema,
  updateUserDetailsSchema,
} = require('../../schemas/user/user_details.schema');

const router = express.Router();
const service = new UserDetailsService();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    // #swagger.tags = ['Users - User details']
    // #swagger.summary = 'Get all the details of the users'
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
  validatorHandler(getUserDetailsSchema, 'params'),
  async (req, res, next) => {
    // #swagger.tags = ['Users - User details']
    // #swagger.summary = 'Get user details by ID'
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
  validatorHandler(createUserDetailsSchema, 'body'),
  async (req, res, next) => {
    // #swagger.tags = ['Users - User details']
    // #swagger.summary = 'Create new user and new user details'
    /* #swagger.security = [{
      "bearerAuth": []
    }] */
    /* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/definitions/UserDetails" },
          examples: {
            'User and user details': { $ref: "#/components/examples/NewUserDetails" },
            'User details': { $ref: "#/components/examples/UserDetails" }
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
  validatorHandler(getUserDetailsSchema, 'params'),
  validatorHandler(updateUserDetailsSchema, 'body'),
  async (req, res, next) => {
    // #swagger.tags = ['Users - User details']
    // #swagger.summary = 'Update user details by ID'
    /* #swagger.security = [{
      "bearerAuth": []
    }] */
    /* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/definitions/UserDetails" },
          examples: {
            'User details': { $ref: "#/components/examples/UserDetails" }
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

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getUserDetailsSchema, 'params'),
  async (req, res, next) => {
    // #swagger.tags = ['Users - User details']
    // #swagger.summary = 'Delete user details by ID'
    /* #swagger.security = [{
      "bearerAuth": []
    }] */
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
