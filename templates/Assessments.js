const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const Teachers = require('./teachers');
const Students = require('./Students');


const Assessments = sequelize.define(
  'assessments',
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    id_teachers: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    id_students: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    imc: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
  },
);

Assessments.belongsTo(Teachers, {
  as: 'teachers',
  targetKey: 'id',
  foreignKey: 'id_teachers',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
});

Assessments.belongsTo(Students, {
  as: 'students',
  targetKey: 'id',
  foreignKey: 'id_students',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
});

module.exports = Assessments;
