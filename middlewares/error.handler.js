const { ValidationError } = require('sequelize');

function logErrors(err, req, res, next) {
  next(err);
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  res.status(400).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }

  next(err);
}

// eslint-disable-next-line no-unused-vars
function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors,
    });
  }

  next(err);
}

module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler };
