// pull in environment variables
require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PW,
  {
    host: 'localhost',
    dialect: 'mysql',
  }
);

sequelize.authenticate()
  .then(() => console.log('Database connected.'))
  .catch(err => console.error('Connection failed:', err));

module.exports = sequelize; // Only export once!