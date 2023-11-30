'use strict';

module.exports = {
  async up(queryInterface, Sequelize) { // eslint-disable-line no-unused-vars
    const chats = await queryInterface.sequelize.query(
      `SELECT id from "Chats";`
    );

    const profiles = await queryInterface.sequelize.query(
      `SELECT id from "Profiles";`
    );

    const chatsRows = chats[0];
    const profilesRows = profiles[0];

    await queryInterface.bulkInsert(
      'Messages',
      [
        {
          date: new Date(),
          text: 'Hola, ¿cómo estás?',
          chat_id: chatsRows[0].id,
          sender: profilesRows[1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          date: new Date(),
          text: '¡Bien, gracias!',
          chat_id: chatsRows[0].id,
          sender: profilesRows[3].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) { // eslint-disable-line no-unused-vars
    await queryInterface.bulkDelete('Messages', null, {});
  },
};
