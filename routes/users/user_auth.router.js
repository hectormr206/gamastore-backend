const express = require('express');
const passport = require('passport');

const AuthService = require('../../services/user/user_auth.service');

const router = express.Router();
const service = new AuthService();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    // #swagger.tags = ['Authentication']
    // #swagger.summary = 'Authenticate user'
    /* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/definitions/Auth" },
          examples: {
            Auth: { $ref: "#/components/examples/Auth" }
          }
        }
      }
    } */
    try {
      const user = req.user;
      res.json(await service.signToken(user));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
