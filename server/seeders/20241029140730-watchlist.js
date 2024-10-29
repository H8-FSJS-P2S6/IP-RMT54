'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = require("../data/watchlists.json").map((e) => {
      e.createdAt = e.updatedAt = new Date();
      return e;
    });
    await queryInterface.bulkInsert("Watchlists", data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Watchlists", null, {});
  }
};
