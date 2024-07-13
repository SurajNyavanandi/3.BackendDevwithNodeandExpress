const  Sequelize  = require('sequelize');
const sequelize=require('../config/database');
const SignUp=sequelize.define('signup',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    username:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    }

})
module.exports=SignUp;