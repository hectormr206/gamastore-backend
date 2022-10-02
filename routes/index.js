const express = require('express');

// Users
const userAuthRouter = require('./users/user_auth.router');
const userDetailsRouter = require('./users/user_details.router');
const usersRouter = require('./users/users.router');

// Products
const productsMeasuresRouter = require('./products/products_measures.router');
const productsCategoriesRouter = require('./products/products_categories.router');
const productsBrandsRouter = require('./products/products_brands.router');
const productsRouter = require('./products/products.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

  // Users
  router.use('/auth', userAuthRouter);
  router.use('/user_details', userDetailsRouter);
  router.use('/users', usersRouter);

  // Products
  router.use('/products/measures', productsMeasuresRouter);
  router.use('/products/categories', productsCategoriesRouter);
  router.use('/products/brands', productsBrandsRouter);
  router.use('/products', productsRouter);
}

module.exports = routerApi;
