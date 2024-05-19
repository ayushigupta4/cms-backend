const { Sequelize } = require('sequelize');

const db = new Sequelize('ayushidb', 'cms-user', 'AG16#mysql', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = db;
