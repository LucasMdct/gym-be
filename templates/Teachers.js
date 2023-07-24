const { DataTypes } = require('sequelize');
const sequelize = require('../persistence/db');
const { hPassword } = require('../usefulness/password');

const Teachers = sequelize.define(
  'teachers',
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(500),
      allowNull: false,
      set(value) {
        this.setDataValue('password', hPassword(value));
      },
    },
  },
  {
   
    indexes: [
      {
        name: 'user_email',
        unique: true,
        fields: ['email'],
      },
    ],

    defaultScope: {
      attributes: {
        exclude: ['password'],
      },
    },
  },
);

module.exports = Teachers;
