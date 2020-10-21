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
  };
  Product.init({
    name_product: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        equals: 0
      }
    } 
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};