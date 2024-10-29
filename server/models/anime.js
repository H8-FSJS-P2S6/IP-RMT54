'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Anime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Anime.hasMany(models.Comment, { foreignKey: 'mal_id' });
      Anime.hasMany(models.Watchlist, { foreignKey: 'mal_id' });
      Anime.hasMany(models.Like, { foreignKey: 'mal_id' });
    }
  }
  Anime.init({
    mal_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'mal_id cannot be empty'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Anime',
  });
  return Anime;
};