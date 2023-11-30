'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Swipe extends Model {
    static associate(models) {
      this.belongsTo(models.Profile,{
        foreignKey:'swiper_profile_id'
      });
      this.belongsTo(models.Profile, {
        foreignKey: 'swiped_profile_id'
      });
    }
  }
  Swipe.init({
    // id: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true, 
    // },
    action: DataTypes.STRING,
    swiper_profile_id: DataTypes.INTEGER,
    swiped_profile_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Swipe',
  });
  return Swipe;
};