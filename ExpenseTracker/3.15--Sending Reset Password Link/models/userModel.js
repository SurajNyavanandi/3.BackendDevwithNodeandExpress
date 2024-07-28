const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Expense=require('../models/expenseModel');
const ForgotPasswordRequest = require('./forgotPasswordModel');

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
    totalAmount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    isPremium: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

User.hasMany(Expense);
Expense.belongsTo(User);



User.hasMany(ForgotPasswordRequest);
ForgotPasswordRequest.belongsTo(User);

module.exports = User;
