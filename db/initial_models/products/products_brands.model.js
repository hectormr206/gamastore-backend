const { Model, DataTypes, Sequelize } = require('sequelize');

const PRODUCT_BRAND_TABLE = 'products_brands';

const ProductBrandSchema = {
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

class ProductBrand extends Model {
  static associate(models) {
    this.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'productBrandId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_BRAND_TABLE,
      modelName: 'ProductBrand',
      timestamps: false,
    };
  }
}

module.exports = { ProductBrand, ProductBrandSchema, PRODUCT_BRAND_TABLE };
