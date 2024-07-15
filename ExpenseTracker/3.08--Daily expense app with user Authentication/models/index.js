const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Expense = require('./expenseModel');

const SignUp = sequelize.define('signup', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
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
    }
});

SignUp.hasMany(Expense);
Expense.belongsTo(SignUp);

module.exports = SignUp;
