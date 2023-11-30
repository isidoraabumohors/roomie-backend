'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
      this.belongsTo(models.Location, {
        foreignKey: 'location_id'
      });
      this.hasMany(models.Swipe, {
        foreignKey: 'id',
        onDelete: 'CASCADE', 
      });
      this.hasMany(models.Match, {
        foreignKey: 'id',
        onDelete: 'CASCADE',
      });
    }
  }
  Profile.init({
    user_id: DataTypes.INTEGER,
    location_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};