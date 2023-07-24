
const { DataTypes } = require('sequelize');
const sequelize = require('../persistence/db');


const Students = new sequelize.define(
    'students',
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

    
module.exports = Students;
