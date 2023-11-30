'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    static associate(models) {
      this.hasMany(models.Profile, {
        foreignKey: 'id',
        onDelete: 'CASCADE',
      });
    }
  }
  Location.init({
    city: DataTypes.STRING,
    country: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Location',
  });
  return Location;
};