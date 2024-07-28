const Expense=require('../models/expenseModel');
const User=require('../models/userModel');
const sequelize=require('../config/database');

exports.createExpense=async(req,res)=>{
       const t=await sequelize.transaction();
    try {
        const userId=req.userId;//via middleware
        const user=await User.findOne({where:{id:userId}},{transaction:t});
        const {amount,description,category}=req.body;
        const expense=await Expense.create({amount,description,category,userId},{transaction:t});

        if(expense){
            user.totalAmount=Number(expense.amount)+Number(user.totalAmount);
            await user.save({transaction:t});
        }
        await t.commit();
        return res.status(201).json(expense);

    } catch (error) {
        await t.rollback();
       return res.status(500).json({Error:'Error creating expense'}); 
    }
};

exports.getExpenses=async(req,res)=>{
    try {
      const userId=req.userId;
      const expenses=await Expense.findAll({where:{userId:userId}});
      return res.status(200).json(expenses);
    } catch (error) {
      return res.status(500).json({Error:'Error getting expense'});   
    }
};
exports.deleteExpense=async(req,res)=>{
    const t = await sequelize.transaction();
    try {
        const userId=req.userId;//via middleware
        const id=req.params.id;

        const user=await User.findOne({where:{id:userId}},{ transaction: t });
        const expense=await Expense.findOne({where:{id:id}}, { transaction: t })
        if(expense){
            user.totalAmount=Number(user.totalAmount)-Number(expense.amount);
            await user.save({ transaction: t });
            await Expense.destroy({where:{id:id}}, { transaction: t });
        } 
        await t.commit(); 
        return res.status(204).json();
    } catch (error) {
        await t.rollback();
        return res.status(500).json({Error:'Error deleting expense'});
    }
}