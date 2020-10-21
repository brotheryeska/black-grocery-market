'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Products", [
      {
        name_product: "Mawar",
        price: 10000,
        stock: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name_product: "Melati",
        price: 18000,
        stock: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name_product: "Kamboja",
        price: 21000,
        stock: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name_product: "Anggrek",
        price: 25000,
        stock: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("Products", null, {})
  }
};
