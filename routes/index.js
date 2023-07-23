const express = require('express');
const gym_db = require('../persistence/mysql');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('As rotas disponíveis são "/usuarios" e "/tarefas".');
});

router.get('/healthcheck', async (req, res) => {
  try {
    await gym_db.authenticate();
    res.status(204).send();
    console.log('Deu conexão');
  } catch (error) {
    console.warn(error);
    res.status(500).send();
  }
});

module.exports = router;
