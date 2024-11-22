'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = require("../data/likes.json").map((e) => {
      e.createdAt = e.updatedAt = new Date();
      return e;
    });
    await queryInterface.bulkInsert("Likes", data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Likes", null, {});
  }
};
