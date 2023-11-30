// Locations

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Locations',[
    {
      city: 'Santiago',
      country: 'Chile',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      city: 'Concepción',
      country: 'Chile',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      city: 'Talca',
      country: 'Chile',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      city: 'Viña',
      country: 'Chile',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      city: 'La Serena',
      country: 'Chile',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      city: 'Buenos Aires',
      country: 'Argentina',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      city: 'Mendoza',
      country: 'Argentina',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]),
  down: (queryInterface) => queryInterface.bulkInsert('Locations', null, {}),
};
