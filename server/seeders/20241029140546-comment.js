'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = require("../data/comments.json").map((e) => {
      e.createdAt = e.updatedAt = new Date();
      return e;
    });
    await queryInterface.bulkInsert("Comments", data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Comments", null, {});
  }
};
