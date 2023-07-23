const express = require('express');
const connectToDatabase = require('../database/sequelize');



const router = express.Router();

router.get('/', (req, res) => {
  res.send('As rotas disponíveis são "/usuarios" e "/tarefas".');
});

router.get('/healthcheck', async (req, res) => {
  try {
    await connectToDatabase.authenticate();
    res.status(204).send();
    console.log('Deu conexão');
  } catch (error) {
    console.warn(error);
    res.status(500).send();
  }
});

async function main() {
  try {
    const sequelize = await connectToDatabase();

    // Seu código com Sequelize aqui

    // Exemplo de uso: obter todos os itens da tabela "todo_items"
    const TodoItem = sequelize.define('todo_items', {
      id: {
        type: Sequelize.STRING(36),
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    });

    const allItems = await TodoItem.findAll();
    console.log('All items:', allItems.map((item) => item.toJSON()));
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();

module.exports = router;