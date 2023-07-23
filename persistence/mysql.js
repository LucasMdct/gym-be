const Sequelize = require('sequelize');

const getEnvVar = (key) => {
  const value = process.env[key];
  if (!value) {
    console.error(`Environment variable ${key} is not set.`);
    process.exit(1);
  }
  return value;
};

const connectToDatabase = async () => {
  const host = getEnvVar('MYSQL_HOST');
  const user = getEnvVar('MYSQL_USER');
  const password = getEnvVar('MYSQL_PASSWORD');
  const database = getEnvVar('MYSQL_DATABASE');
  const port = Number(process.env.MYSQL_PORT) || 3306;

  const sequelize = new Sequelize(database, user, password, {
    host,
    port,
    dialect: 'mysql',
  });
  
  return sequelize;
};

module.exports = connectToDatabase;