const { Model, DataTypes, Sequelize } = require('sequelize');

const PRODUCT_CATEGORY_TABLE = 'products_categories';

const ProductCategorySchema = {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    unique: true,
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
};

class ProductCategory extends Model {
  static associate(models) {
    this.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'productCategoryId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_CATEGORY_TABLE,
      modelName: 'ProductCategory',
      timestamps: false,
    };
  }
}

module.exports = {
  ProductCategory,
  ProductCategorySchema,
  PRODUCT_CATEGORY_TABLE,
};
