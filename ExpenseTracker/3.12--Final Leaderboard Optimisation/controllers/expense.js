const Expense = require('../models/expense');
const User=require('../models/user');

exports.createExpense = async (req, res) => {
    try {
        const uid = req.user.userId;
        const expense = await Expense.create({...req.body, userId: uid});

        //Fetch-Update-Save
        const user = await User.findOne({ where: { id: uid } });
        if (user) {
            //user.totalAmount+=expense.amount;
            user.totalAmount = parseFloat(user.totalAmount) + parseFloat(expense.amount);
            await user.save();
        }

        res.status(201).json(expense);
    } catch (error) {
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

        const expense = await Expense.findOne({ where: { id: expenseId } });
        if (expense) {
            await Expense.destroy({ where: { id: expenseId } });

            //Fetch-Update-Save
            const user = await User.findOne({ where: { id: uid } });
            if (user) {
                user.totalAmount = parseFloat(user.totalAmount) - parseFloat(expense.amount);
                await user.save();
            }
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ Error: 'Deleting expenses' });
    }
}


