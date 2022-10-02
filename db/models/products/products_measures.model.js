const { Model, DataTypes, Sequelize } = require('sequelize');

const PRODUCT_MEASURE_TABLE = 'products_measures';

const ProductMeasureSchema = {
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

class ProductMeasure extends Model {
  static associate(models) {
    this.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'productMeasureId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_MEASURE_TABLE,
      modelName: 'ProductMeasure',
      timestamps: false,
    };
  }
}

module.exports = {
  ProductMeasure,
  ProductMeasureSchema,
  PRODUCT_MEASURE_TABLE,
};
