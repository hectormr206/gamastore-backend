'use strict';
const bcrypt = require('bcrypt');

// User
const {
  UserSchema,
  USER_TABLE,
} = require('../initial_models/users/user.model');
const {
  UserDetailsSchema,
  USER_DETAILS_TABLE,
} = require('../initial_models/users/user_details.model');

// Products
const {
  ProductSchema,
  PRODUCT_TABLE,
} = require('../initial_models/products/products.model');
const {
  ProductBrandSchema,
  PRODUCT_BRAND_TABLE,
} = require('../initial_models/products/products_brands.model');
const {
  ProductCategorySchema,
  PRODUCT_CATEGORY_TABLE,
} = require('../initial_models/products/products_categories.model');
const {
  ProductMeasureSchema,
  PRODUCT_MEASURE_TABLE,
} = require('../initial_models/products/products_measures.model');

// Data By Default
const { UserDetailsInitial } = require('../seeders/users/user_details.initial');
const { ProductInitial } = require('../seeders/products/products.initial');
const {
  ProductBrandInitial,
} = require('../seeders/products/products_brands.initial');
const {
  ProductCategoryInitial,
} = require('../seeders/products/products_categories.initial');
const {
  ProductMeasureInitial,
} = require('../seeders/products/products_measures.initial');

module.exports = {
  async up(queryInterface) {
    // User
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(USER_DETAILS_TABLE, UserDetailsSchema);

    // Products
    await queryInterface.createTable(
      PRODUCT_MEASURE_TABLE,
      ProductMeasureSchema
    );
    await queryInterface.createTable(
      PRODUCT_CATEGORY_TABLE,
      ProductCategorySchema
    );
    await queryInterface.createTable(PRODUCT_BRAND_TABLE, ProductBrandSchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);

    /*------ Data by default ------*/

    // User
    const hash = await bcrypt.hash('123456789', 10);
    await queryInterface.bulkInsert(USER_TABLE, [
      {
        user_name: 'hectormr',
        password: hash,
        role: 'admin',
        created_at: new Date(),
      },
    ]);
    await queryInterface.bulkInsert(USER_DETAILS_TABLE, UserDetailsInitial);

    // Products
    await queryInterface.bulkInsert(
      PRODUCT_MEASURE_TABLE,
      ProductMeasureInitial
    );
    await queryInterface.bulkInsert(
      PRODUCT_CATEGORY_TABLE,
      ProductCategoryInitial
    );
    await queryInterface.bulkInsert(PRODUCT_BRAND_TABLE, ProductBrandInitial);
    await queryInterface.bulkInsert(PRODUCT_TABLE, ProductInitial);
  },

  async down(queryInterface) {
    // Products
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(PRODUCT_BRAND_TABLE);
    await queryInterface.createTable(
      PRODUCT_CATEGORY_TABLE,
      ProductCategorySchema
    );
    await queryInterface.createTable(
      PRODUCT_MEASURE_TABLE,
      ProductMeasureSchema
    );

    // User
    await queryInterface.dropTable(USER_DETAILS_TABLE);
    await queryInterface.dropTable(USER_TABLE);
  },
};
