// Users
const { User, UserSchema } = require('./users/user.model');
const {
  UserDetails,
  UserDetailsSchema,
} = require('./users/user_details.model');

// Products
const { Product, ProductSchema } = require('./products/products.model');
const {
  ProductBrand,
  ProductBrandSchema,
} = require('./products/products_brands.model');
const {
  ProductCategory,
  ProductCategorySchema,
} = require('./products/products_categories.model');
const {
  ProductMeasure,
  ProductMeasureSchema,
} = require('./products/products_measures.model');

function setupModels(sequelize) {
  /* Initial models */

  // Users
  UserDetails.init(UserDetailsSchema, UserDetails.config(sequelize));
  User.init(UserSchema, User.config(sequelize));

  // Products
  Product.init(ProductSchema, Product.config(sequelize));
  ProductBrand.init(ProductBrandSchema, ProductBrand.config(sequelize));
  ProductCategory.init(
    ProductCategorySchema,
    ProductCategory.config(sequelize)
  );
  ProductMeasure.init(ProductMeasureSchema, ProductMeasure.config(sequelize));

  /* Associations */

  // Users
  UserDetails.associate(sequelize.models);
  User.associate(sequelize.models);

  // Products
  Product.associate(sequelize.models);
  ProductBrand.associate(sequelize.models);
  ProductCategory.associate(sequelize.models);
  ProductMeasure.associate(sequelize.models);
}

module.exports = setupModels;
