'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    static associate(models) {
      this.belongsTo(models.Profile,{
        foreignKey:'profile_A_id'
      });
      this.belongsTo(models.Profile,{
        foreignKey:'profile_B_id'
      });
      this.hasOne(models.Chat,{
        foreignKey:'id',
        onDelete: 'CASCADE',
      });
    }
  }
  Match.init({
    // id: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    // },
    profile_A_id: DataTypes.INTEGER,
    profile_B_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Match',
  });
  return Match;
};