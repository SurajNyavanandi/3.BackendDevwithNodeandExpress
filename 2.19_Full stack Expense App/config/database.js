const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'tomvirat', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;