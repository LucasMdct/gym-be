const Sequelize = require('sequelize');
const fs = require('fs');
const { promisify } = require('util');
const waitPort = require('wait-port');

const {
  MYSQL_HOST: HOST,
  MYSQL_HOST_FILE: HOST_FILE,
  MYSQL_USER: USER,
  MYSQL_USER_FILE: USER_FILE,
  MYSQL_PASSWORD: PASSWORD,
  MYSQL_PASSWORD_FILE: PASSWORD_FILE,
  MYSQL_DB: DB,
  MYSQL_DB_FILE: DB_FILE,
  MYSQL_PORT: PORT,
} = process.env;

let sequelize;

async function init() {
  const host = HOST_FILE ? fs.readFileSync(HOST_FILE, 'utf8') : HOST;
  const user = USER_FILE ? fs.readFileSync(USER_FILE, 'utf8') : USER;
  const password = PASSWORD_FILE
    ? fs.readFileSync(PASSWORD_FILE, 'utf8')
    : PASSWORD;
  const database = DB_FILE ? fs.readFileSync(DB_FILE, 'utf8') : DB;
  const port = Number(PORT) || 3306;

  await waitPort({ host, port });

  sequelize = new Sequelize(database, user, password, {
    host,
    port,
    dialect: 'mysql',
  });

  try {
    await sequelize.authenticate();
    console.log('Connected to MySQL database.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }

  // Define a model for the 'todo_items' table
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

  // Synchronize the model with the database and create the table if not exists
  await sequelize.sync();
}

async function teardown() {
  await sequelize.close();
  console.log('Connection closed.');
}

module.exports = {
  init,
  teardown,
};
