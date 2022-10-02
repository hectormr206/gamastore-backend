const { Model, DataTypes, Sequelize } = require('sequelize');

const { PRODUCT_BRAND_TABLE } = require('./products_brands.model');
const { PRODUCT_CATEGORY_TABLE } = require('./products_categories.model');
const { PRODUCT_MEASURE_TABLE } = require('./products_measures.model');

const PRODUCT_TABLE = 'products';

const ProductSchema = {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  universalCode: {
    unique: true,
    field: 'universal_code',
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  productBrandId: {
    field: 'product_brand_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_BRAND_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  productCategoryId: {
    field: 'product_category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_CATEGORY_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  productMeasureId: {
    field: 'product_measure_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_MEASURE_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Product extends Model {
  static associate(models) {
    this.belongsTo(models.ProductBrand, { as: 'productBrand' });
    this.belongsTo(models.ProductCategory, { as: 'productCategory' });
    this.belongsTo(models.ProductMeasure, { as: 'productMeasure' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false,
    };
  }
}

module.exports = { Product, ProductSchema, PRODUCT_TABLE };
