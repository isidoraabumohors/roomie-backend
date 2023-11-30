'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      this.belongsTo(models.Chat, {
        foreignKey: 'chat_id'
      });
      this.belongsTo(models.Profile, {
        foreignKey: 'sender'
      });
    }
  }
  Message.init({
    date: DataTypes.DATE,
    text: DataTypes.STRING,
    chat_id: DataTypes.INTEGER,
    sender: DataTypes.INTEGER,
    // id: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true, 
    // },
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};