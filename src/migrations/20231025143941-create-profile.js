'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key:'id' },
        onDelete: 'CASCADE',
      },
      location_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Locations', key:'id' },
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('Profiles');
  }
};