'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsToMany(models.User, {
        through: models.Transaction,
        foreignKey: 'ProductId'
      })
      Product.hasMany(models.Transaction)
    }

    addBungaToProductName () {
      return `Bunga ${this.name_product}`
    }
  };
  Product.init({
    name_product: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};