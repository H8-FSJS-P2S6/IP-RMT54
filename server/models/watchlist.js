'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Watchlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Watchlist.belongsTo(models.User, { foreignKey: 'userId' });
      Watchlist.belongsTo(models.Anime, { foreignKey: 'mal_id' })
    }
  }
  Watchlist.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'userId cannot be empty'
        }
      }
    },
    mal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'mal_id cannot be empty'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Watchlist',
  });
  return Watchlist;
};