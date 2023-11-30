'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Swipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true
      },
      action: {
        type: Sequelize.STRING
      },
      swiper_profile_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Profiles', key:'id' },
        onDelete: 'CASCADE',
      },
      swiped_profile_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Profiles', key:'id' },
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
    await queryInterface.dropTable('Swipes');
  }
};