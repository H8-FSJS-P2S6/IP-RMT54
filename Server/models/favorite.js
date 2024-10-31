"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favorite.belongsTo(models.User)
    }
  }
  Favorite.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: `User Id is required`,
          },
          notEmpty: {
            args: true,
            msg: `User Id is required`,
          },
        },
      },
      pokemonName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: `Pokemon Name is required`,
          },
          notEmpty: {
            args: true,
            msg: `Pokemon Name is required`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Favorite",
      indexes: [
        {
          unique: true,
          fields: ["UserId", "pokemonName"],
        },
      ],
    }
  );
  return Favorite;
};
