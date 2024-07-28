const Sequelize = require('sequelize');
const sequelize = new Sequelize('a', 'root', 'tomvirat', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;
