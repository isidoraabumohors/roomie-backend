'use strict';

module.exports = {
  async up(queryInterface, Sequelize) { // eslint-disable-line no-unused-vars
    const profiles = await queryInterface.sequelize.query(
      `SELECT id from "Profiles";`
    );

    const profilesRows = profiles[0];

    await queryInterface.bulkInsert(
      'Swipes',
      [
        { // Amelia en Santiago a Teresa en Santiago
          swiper_profile_id: profilesRows[0].id,
          swiped_profile_id: profilesRows[2].id,
          action: "like",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { // Amelia en Concepción a Teresa en Concepción
          swiper_profile_id: profilesRows[1].id,
          swiped_profile_id: profilesRows[3].id,
          action: "like",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { // Teresa en Concepción a Amelia en Concepción
          swiper_profile_id: profilesRows[3].id,
          swiped_profile_id: profilesRows[1].id,
          action: "like",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { // Isidora en Viña a Joaquín en Viña
          swiper_profile_id: profilesRows[5].id,
          swiped_profile_id: profilesRows[6].id,
          action: "like",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { // Joaquón en Viña a Isidora en Viña
          swiper_profile_id: profilesRows[6].id,
          swiped_profile_id: profilesRows[5].id,
          action: "like",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { // Rodrigo en Santiago a Matías en Santiago
          swiper_profile_id: profilesRows[9].id,
          swiped_profile_id: profilesRows[11].id,
          action: "dislike",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Puedes continuar agregando más registros de Swipes según sea necesario
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) { // eslint-disable-line no-unused-vars
    await queryInterface.bulkDelete('Swipes', null, {});
  },
};