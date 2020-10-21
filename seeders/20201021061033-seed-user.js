'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  
    return queryInterface.bulkInsert('Users',[{
      full_name: 'Hutamy Triesthi',
      email: 'hutamytriesthi@gmail.com',
      password: 'ngantuk',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      full_name: 'Hutamy',
      email: 'hutamy@gmail.com',
      password: 'ngantuk',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      full_name: 'Yeska',
      email: 'yeska@gmail.com',
      password: 'lelah',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      full_name: 'Ayu Sudi',
      email: 'instRuckTo3r_Q@gmail.com',
      password: 'sudahcukup',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {})
  },


  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
