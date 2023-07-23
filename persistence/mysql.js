const Sequelize = require('sequelize');
const fs = require('fs');
const { promisify } = require('util');
const waitPort = require('wait-port');

const host = HOST_FILE ? fs.readFileSync(HOST_FILE, 'utf8') : HOST;
  const user = USER_FILE ? fs.readFileSync(USER_FILE, 'utf8') : USER;
  const password = PASSWORD_FILE
    ? fs.readFileSync(PASSWORD_FILE, 'utf8')
    : PASSWORD;
  const database = DB_FILE ? fs.readFileSync(DB_FILE, 'utf8') : DB;
  const port = Number(PORT) || 3306;
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


const sequelize = new Sequelize(
  await waitPort({ host, port }),
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  {
    dialect: 'mysql',
    host: MYSQL_HOST,
    port: DATABASE_PORT,
    define: {
      // Ativa os timestamps e configura para ser criado com
      // underline entre as palavras.
      // Docs: https://sequelize.org/docs/v6/core-concepts/model-basics/#timestamps
      timestamps: true,
      underscored: true,
    },
  },
);
try {
  await sequelize.authenticate();
  console.log('Connected to MySQL database.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
  process.exit(1);
}


//   // Define a model for the 'todo_items' table
//   const TodoItem = sequelize.define('todo_items', {
//     id: {
//       type: Sequelize.STRING(36),
//       primaryKey: true,
//       allowNull: false,
//     },
//     name: {
//       type: Sequelize.STRING(255),
//       allowNull: false,
//     },
//     completed: {
//       type: Sequelize.BOOLEAN,
//       allowNull: false,
//     },
//   });

//   // Synchronize the model with the database and create the table if not exists
//   await sequelize.sync();
// }

// async function teardown() {
//   await sequelize.close();
//   console.log('Connection closed.');
// }

export default sequelize;