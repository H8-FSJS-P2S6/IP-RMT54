'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = require('../data/users.json').map((e) => {
      e.createdAt = e.updatedAt = new Date()
      e.password = bcrypt.hashSync(e.password, 10);
      return e;
    });
    await queryInterface.bulkInsert('Users', data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'TRUNCATE TABLE "Users" RESTART IDENTITY CASCADE'
    );
  }
};
