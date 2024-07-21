const Expense = require('../models/expense');
const User=require('../models/user');
const sequelize=require('../config/database');

exports.createExpense = async (req, res) => {
    try {
        const transaction=await sequelize.transaction();


        const uid = req.user.userId;
        const expense = await Expense.create({...req.body, userId: uid},{transaction});

        //Fetch-Update-Save
        const user = await User.findOne({ where: { id: uid } });
        if (user) {
            //user.totalAmount+=expense.amount;
            user.totalAmount = Number(user.totalAmount) + Number(expense.amount);
            await User.update({ totalAmount: user.totalAmount }, { where: { id: uid }, transaction });
            //***await user.save({transaction});
        }
        await transaction.commit();
        res.status(201).json(expense);
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ Error: 'Posting the expense details' });
    }
}



exports.getExpenses = async (req, res) => {
    try {
        const uid=req.user.userId;
        const expenses = await Expense.findAll({where:{userId:uid}});
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({Error: 'Getting expenses'});
    }
}

exports.deleteExpense = async (req, res) => {
    try {

        const uid = req.user.userId;
        const expenseId = req.params.id;
        const transaction=await sequelize.transaction();

        const expense = await Expense.findOne({ where: { id: expenseId } ,transaction});
        
        
        if (expense) {
            await Expense.destroy({ where: { id: expenseId } });

            //Fetch-Update-Save
            const user = await User.findOne({ where: { id: uid } });
            if (user) {
                user.totalAmount = Number(user.totalAmount) - Number(expense.amount);
               // await User.update({ totalAmount: user.totalAmount }, { where: { id: uid }, transaction });
                await user.save();
            }
        }
        await transaction.commit();
        res.status(204).send();
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ Error: 'Deleting expenses' });
    }
}


