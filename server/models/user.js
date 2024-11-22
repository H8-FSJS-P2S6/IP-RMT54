"use strict";
const bcrypt = require('bcryptjs');
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Comment, { foreignKey: "userId" });
      User.hasMany(models.Watchlist, { foreignKey: "userId" });
      User.hasMany(models.Like, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "Username cannot be empty"
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Must be a valid email address"
          },
          notEmpty: {
            msg: "Email cannot be empty"
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password cannot be empty"
          },
          len: {
            args: [5], 
            msg: "Password must be at least 5 characters long"
          }
        }
      }
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate(instance, options) {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(instance.password, salt);

          instance.password = hash;
        },
      },
    }
  );
  return User;
};
