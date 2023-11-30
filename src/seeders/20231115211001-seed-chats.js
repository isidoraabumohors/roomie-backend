'use strict';

module.exports = {
  async up(queryInterface, Sequelize) { // eslint-disable-line no-unused-vars
    const matches = await queryInterface.sequelize.query(
      `SELECT id from "Matches";`
    );

    const matchesRows = matches[0];

    await queryInterface.bulkInsert(
      'Chats',
      [
        {
          match_id: matchesRows[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          match_id: matchesRows[1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) { // eslint-disable-line no-unused-vars
    await queryInterface.bulkDelete('Chats', null, {});
  },
};
