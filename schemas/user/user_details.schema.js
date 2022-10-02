const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const lastName = Joi.string();
const email = Joi.string().email().empty('');
const phone = Joi.number().positive().empty('');
const username = Joi.string();
const password = Joi.string().min(6);
const role = Joi.string().min(1);

const getUserDetailsSchema = Joi.object({
  id: id.required(),
});

const createUserDetailsSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  email,
  phone,
  user: Joi.object({
    username: username.required(),
    password: password.required(),
    role: role.required(),
  }),
});

const updateUserDetailsSchema = Joi.object({
  name,
  lastName,
  email,
  phone,
  user: Joi.object({
    username,
    password,
    role,
  }),
});

module.exports = {
  getUserDetailsSchema,
  createUserDetailsSchema,
  updateUserDetailsSchema,
};
