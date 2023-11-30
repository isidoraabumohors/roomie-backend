'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) { // eslint-disable-line no-unused-vars
    const users = await queryInterface.sequelize.query(
      `SELECT id from "Users";`
    );
    const locations = await queryInterface.sequelize.query(
      `SELECT id from "Locations";`
    );

    const usersRows = users[0];
    const locationsRows = locations[0];

    await queryInterface.bulkInsert(
      'Profiles',
      [
        { // Perfil 0
          user_id: usersRows[0].id, //Perfil de Amelia en Santiago
          location_id: locationsRows[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { // Perfil 1
          user_id: usersRows[0].id, //Perfil de Amelia en Concepción
          location_id: locationsRows[1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { // Perfil 2
          user_id: usersRows[1].id, // Perfil de Teresa en Santiago
          location_id: locationsRows[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { // Perfil 3
          user_id: usersRows[1].id, // Perfil de Teresa en Concepción
          location_id: locationsRows[1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { // Perfil 4
        user_id: usersRows[1].id, // Perfil de Teresa en Talca
        location_id: locationsRows[2].id,
        createdAt: new Date(),
        updatedAt: new Date(),
        },
        { // Perfil 5
          user_id: usersRows[2].id,// Perfil de Isidora en Viña
          location_id: locationsRows[3].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { // Perfil 6
          user_id: usersRows[3].id, // Perfil de Joaquín en Viña
          location_id: locationsRows[3].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { // Perfil 7
          user_id: usersRows[4].id, // Perfil de Felipe en La Serena
          location_id: locationsRows[4].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { // Perfil 8
          user_id: usersRows[4].id, // Perfil de Felipe en Buenos Aires
          location_id: locationsRows[5].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { // Perfil 9
          user_id: usersRows[5].id, // Perfil de Rodrigo en Santiago
          location_id: locationsRows[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { // Perfil 10
          user_id: usersRows[5].id, // Perfil de Rodrigo en Concepción
          location_id: locationsRows[1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { // Perfil 11
          user_id: usersRows[6].id, // Perfil de Matías en Santiago
          location_id: locationsRows[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) { // eslint-disable-line no-unused-vars
    await queryInterface.bulkDelete('Profiles', null, {});
  },
};
