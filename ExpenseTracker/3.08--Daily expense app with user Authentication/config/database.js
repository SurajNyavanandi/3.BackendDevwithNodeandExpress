const Sequelize = require('sequelize');
const sequelize = new Sequelize('expensetracker', 'root', 'tomvirat', {
    dialect: 'mysql',
    host: 'localhost'
});
module.exports = sequelize;
