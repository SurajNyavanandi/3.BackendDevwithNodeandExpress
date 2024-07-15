const Expense = require('../models/expenseModel');

exports.createExpense = async (req, res) => {
    try {
        const userId = req.user.userId;
        const expense = await Expense.create({ ...req.body, signupId: userId });
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ Error: "Posting the expense details" });
    }
};

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.findAll({ where: { signupId: req.user.userId } });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ Error: "Getting the expense details" });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        const userId = req.user.userId;
        const expenseId = req.params.id;
        const expense = await Expense.findOne({ where: { id: expenseId, signupId: userId } });

        if (!expense) {
            return res.status(404).json({ Error: "Expense not found" });
        }

        await Expense.destroy({ where: { id: expenseId } });
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ Error: "Deleting the expense details" });
    }
};
