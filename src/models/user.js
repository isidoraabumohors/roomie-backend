'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Profile, {
        foreignKey: 'id',
        onDelete: 'CASCADE',
      })
    }
  }

User.init({
  username: {
    type: DataTypes.STRING,
    validate: {
      isAlphanumeric: {
        msg: 'Username must be alphanumeric',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    validate: {
      isValidPassword(value) {
        if (!value.match(/[a-z]/) || !value.match(/[0-9]/) || !value.match(/[@$!%*?&]/)) {
          throw new Error('The password must contain at least a letter, one number, and one special character');
        }
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: {
        msg: 'Mail must have an email format',
      },
    },
  },
  age: DataTypes.INTEGER,
  bio: DataTypes.TEXT,
  photo: DataTypes.STRING,
}, {
  sequelize, 
  modelName: 'User',
});
return User;
};