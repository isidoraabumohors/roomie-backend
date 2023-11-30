'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      date: {
        type: Sequelize.DATE
      },
      text: {
        type: Sequelize.TEXT
      },
      chat_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: { model: 'Chats', key:'id' }
      },
      sender: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {model: 'Profiles', key:'id'}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) { // eslint-disable-line no-unused-vars
    await queryInterface.dropTable('Messages');
  }
};