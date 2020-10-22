'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Product, {
        through: models.Transaction,
        foreignKey: 'UserId'
      })
      User.hasMany(models.Transaction)
    }
  };
  User.init({
    full_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Name is Required!'}
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Email is Required!'}
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Password is Required!'}
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Role is Required!'}
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};