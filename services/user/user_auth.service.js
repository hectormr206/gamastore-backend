const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { config } = require('../../config/config');

const UserService = require('./user.service');
const service = new UserService();

class AuthService {
  async getUser(username, password) {
    const user = await service.findByUserName(username);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    return user;
  }
  async signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '720min' });
    console.log('Entro al servicio');
    return {
      user,
      token,
    };
  }
}

module.exports = AuthService;
