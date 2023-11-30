// Users

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface) => {
    const saltRounds = 10;

    const hashedPasswords = await Promise.all([
      bcrypt.hash('Example.123!', saltRounds),
    ]);

    const users = [
      {
        username: 'Amelia',
        password: hashedPasswords[0],
        email: 'aedwardsg@uc.cl',
        age: 23,
        bio: 'Hola! Me llamo Amelia y soy estudiante de Ingeniería Civil en Computación en la UC. Me gusta mucho la música, toco guitarra y piano. También me gusta mucho el deporte, en especial el fútbol y el tenis. Me encanta viajar y conocer nuevas culturas.',
        photo: 'https://cdn2.vectorstock.com/i/1000x1000/54/41/young-and-elegant-woman-avatar-profile-vector-9685441.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'Teresa',
        password: hashedPasswords[0],
        email: 'teresa.orellana@uc.cl',
        age: 22,
        bio: 'Buenas! Mi nombre es Teresa y busco un compañero para vivir cerca de mi universidad. Estudio enfermería y me gustan mucho los animales. Me encanta salir a caminar y hacer trekking. También me gusta mucho la música, toco guitarra y piano. Me encanta viajar y conocer nuevas culturas.',
        photo: 'https://cdn5.vectorstock.com/i/1000x1000/20/74/woman-avatar-profile-vector-21372074.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'Isidora',
        password: hashedPasswords[0],
        email: 'isidora.abumohor@uc.cl',
        age: 22,
        bio: 'Mi nombre es Isidora. Estoy buscando alguien para compartir departamento. Soy muy amistosa. Algunas de mis actividades favoritas son salir a caminar, hacer trekking y escuchar música. Me encanta viajar y conocer nuevas culturas.',
        photo: 'https://cdn1.vectorstock.com/i/1000x1000/73/15/female-avatar-profile-icon-round-woman-face-vector-18307315.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'Joaquin',
        password: hashedPasswords[0],
        email: 'joaquin@uc.cl',
        age: 25,
        bio: 'Buenas! Estoy aquí para encontrar alguien con quién compartir una casa o departamento cerca de mi lugar de trabajo. Me dedico a la programación y me gusta mucho mi trabajo. Me gusta mucho el deporte, en especial el fútbol y el tenis. Soy ordenado y me gusta mantener mi espacio limpio.',
        photo: 'https://img.freepik.com/vector-premium/perfil-avatar-hombre-icono-redondo_24640-14044.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'Felipe',
        password: hashedPasswords[0],
        email: 'felipe@uc.cl',
        age: 30,
        bio: 'Hola! Soy Felipe y estoy actualmente en un año sabático. Necesito un compañero de pieza que esté dispuesto a hacer actividades entretenidas en nuestro hogar. Por lo general, me gusta mucho salir a caminar y hacer trekking. También me gusta mucho la música, toco guitarra y piano. Me encanta viajar y conocer nuevas culturas.',
        photo: 'https://img.freepik.com/vector-premium/perfil-avatar-hombre-icono-redondo_24640-14046.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'Rodrigo',
        password: hashedPasswords[0],
        email: 'rodrigo@uc.cl',
        age: 50,
        bio: 'Hola. Soy Rodrigo. Hace poco tiempo me vine a Santiago a trabajar y busco un compañero de departamento. Soy de región, por lo que sólo necesito el departamento durante la semana, ya que los fines de semana voy a mi casa. Me gusta mucho la cocina, el arte y la música.',
        photo: 'https://img.freepik.com/vector-premium/perfil-avatar-hombre-icono-redondo_24640-14049.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'Matias',
        password: hashedPasswords[0],
        email: 'matias@uc.cl',
        age: 45,
        bio: 'Soy Mati! Estoy buscando alguien para compartir departamento. Soy muy amistoso. Algunas de mis actividades favoritas son salir a caminar, hacer trekking y escuchar música. Me encanta viajar y conocer nuevas culturas.',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjTWjCF6Y2Nhqo_GLvawYo38ZJRJLAhGCKbHVo3XG5yDz7eHH3IN0aaimjSy1Ou3G26eE&usqp=CAU',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'Maria',
        password: hashedPasswords[0],
        email: 'maria@uc.cl',
        age: 45,
        bio: 'Hola! Soy María. Me gusta cocinar, leer y escuchar música. Estoy en búsqueda de alguien con mis mismos gustos para compartir una casa o departamento.',
        photo: 'https://img.freepik.com/vector-premium/perfil-avatar-mujer-icono-redondo_24640-14047.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    return queryInterface.bulkInsert('Users', users, {});
  },

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};

// yarn sequelize-cli seed:generate --name seed-locations
// yarn sequelize-cli db:seed:locations