'use strict';

module.exports = {
  async up(queryInterface, Sequelize) { // eslint-disable-line no-unused-vars
    const profiles = await queryInterface.sequelize.query(
      `SELECT id from "Profiles";`
    );

    const profilesRows = profiles[0];

    await queryInterface.bulkInsert(
      'Matches',
      [
        { // Match entre Teresa y Amelia en Concepción
          profile_A_id: profilesRows[1].id,
          profile_B_id: profilesRows[3].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { // Match entre Isidora y Joaquín en Viña
          profile_A_id: profilesRows[5].id,
          profile_B_id: profilesRows[6].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
  
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) { // eslint-disable-line no-unused-vars
    await queryInterface.bulkDelete('Matches', null, {});
  },
};
