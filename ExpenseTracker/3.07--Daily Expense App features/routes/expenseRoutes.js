const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.post('/addexpense', expenseController.createExpense);
router.get('/addexpense',expenseController.getExpenses);
router.delete('/addexpense/:id', expenseController.deleteExpense);


module.exports = router;
