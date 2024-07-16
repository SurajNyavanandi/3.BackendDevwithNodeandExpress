const Expense = require('../models/expense');

exports.createExpense = async (req, res) => {
    try {
        const uid=req.user.userId;
        //const expense = await Expense.create(req.body);
        const expense=await Expense.create({...req.body,userId:uid})
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({Error: 'Posting the expense details'});
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
        const expenseId = req.params.id;
        await Expense.destroy({where: {id: expenseId}});
        res.status(204).send();
    } catch (error) {
        res.status(500).json({Error: 'Deleting expenses'}); 
    }
}
