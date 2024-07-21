const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Expense = require('./expense');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isPremium: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    totalAmount: {
        type: Sequelize.INTEGER,
        defaultValue:0
    }
});

User.hasMany(Expense);
Expense.belongsTo(User);

module.exports = User;
