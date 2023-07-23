const Sequelize = require('sequelize');
const fs = require('fs').promises;

const getEnvVar = async (key) => {
  try {
    const data = await fs.readFile(`/run/secrets/${key}`, 'utf8');
    return data.trim();
  } catch (err) {
    console.error(`Error reading ${key} from CapRover secrets:`, err);
    process.exit(1);
  }
};

const connectToDatabase = async () => {
  const host = await getEnvVar('MYSQL_HOST');
  const user = await getEnvVar('MYSQL_USER');
  const password = await getEnvVar('MYSQL_PASSWORD');
  const database = await getEnvVar('MYSQL_DB');
  const port = Number(await getEnvVar('MYSQL_PORT')) || 3306;

  const sequelize = new Sequelize(database, user, password, {
    host,
    port,
    dialect: 'mysql',
  });

  try {
    await sequelize.authenticate();
    console.log('Connected to the MySQL database!');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    process.exit(1);
  }

  return sequelize;
};

export default connectToDatabase;