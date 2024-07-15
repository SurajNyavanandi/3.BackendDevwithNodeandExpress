const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const authenticateToken = require('../middleware/auth');

router.post('/addexpense', authenticateToken, expenseController.createExpense);
router.get('/addexpense', authenticateToken, expenseController.getExpenses);
router.delete('/addexpense/:id', authenticateToken, expenseController.deleteExpense);

module.exports = router;
