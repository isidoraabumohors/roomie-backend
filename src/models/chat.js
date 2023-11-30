'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Match, {
        foreignKey: 'match_id',
      });
      this.hasMany(models.Message, {
        foreignKey: 'id',
        onDelete: 'CASCADE',
      });
    }
  }
  Chat.init({
    // id: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    // },
    match_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};