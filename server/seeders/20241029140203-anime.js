"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/anime.json").map((e) => {
      e.createdAt = e.updatedAt = new Date();
      return e;
    });
    await queryInterface.bulkInsert("Animes", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Animes", null, {});
  },
};
