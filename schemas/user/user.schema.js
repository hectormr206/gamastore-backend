const Joi = require('joi');

const id = Joi.number().integer();
const username = Joi.string();
const password = Joi.string().min(6);
const role = Joi.string().min(5);

const createUserSchema = Joi.object({
  username: username.required(),
  password: password.required(),
  role: role.required(),
});

const updateUserSchema = Joi.object({
  username: username,
  password: password,
  role: role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  getUserSchema,
  createUserSchema,
  updateUserSchema,
};
