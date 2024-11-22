'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
const bcrypt = require("bcrypt")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Favorite)
      User.belongsTo(models.Profile)
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: `Email has already been used by another User`,
        },
        validate: {
          notNull: {
            args: true,
            msg: `Email is required`,
          },
          notEmpty: {
            args: true,
            msg: `Email is required`,
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: `Password is required`,
          },
          notEmpty: {
            args: true,
            msg: `Password is required`,
          },
        },
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: `User Name is required`,
          },
          notEmpty: {
            args: true,
            msg: `User Name is required`,
          },
        },
      },
      ProfileId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((e) => {
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(e.password, salt);
    e.password = password;
  });
  return User;
};