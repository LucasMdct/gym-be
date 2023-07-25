
const { DataTypes } = require('sequelize');
const sequelize = require('../persistence/db');
const Teachers = require('./teachers')

const Students = sequelize.define(
    'students',
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
        name: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        gender: {
            type: DataTypes.ENUM('M', 'F'),
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER(120),
            allowNull: false,
        },
        height: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false,
        },
        weight: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false,
        },
    },
    {
        // Docs: https://sequelize.org/docs/v6/core-concepts/model-basics
    
        // cria index de busca para otimizar as consultas por título da tarefa
        // exemplo: select * from tarefas where titulo like '%abcd%'
        indexes: [
          {
            type: 'FULLTEXT',
            fields: ['name'],
          },
        ],
        
      },
    );

    Students.belongsTo(Teachers, {
        as: 'teachers',
        targetKey: 'id',
        foreignKey: 'id_teachers',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      });
      

    
module.exports = Students;
