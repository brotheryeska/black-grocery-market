'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
  
    static associate(models) {
      Transaction.belongsTo(models.User)
      Transaction.belongsTo(models.Product)
      
    }
  };
  Transaction.init({
    quantity: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  }, {
    sequelize,
    hooks:{
      beforeUpdate : ((instance) => {
        // console.log(instance)
        // console.log(sequelize.models.Product, "==>")
        return sequelize.models.Product.findByPk(instance.ProductId)
        .then((data) => {
          console.log(data)
          instance.total_price += data.price
        })
      }),
      beforeCreate : ((instance) => {
        return sequelize.models.Product.findByPk(instance.ProductId)
        .then((data) => {
          instance.total_price = data.price
        })
      })
    },
    modelName: 'Transaction', 
  });
  return Transaction;
};