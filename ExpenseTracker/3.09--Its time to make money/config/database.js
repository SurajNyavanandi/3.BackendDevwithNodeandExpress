const Sequelize=require('sequelize');
const sequelize=new Sequelize('demoexpense','root','tomvirat',{
    dialect:'mysql',
    host:'localhost'
})
module.exports=sequelize;
