const express=require('express');
const expenseController=require('../controllers/expenseController');
const verifyToken=require('../middleware/authMiddleware');
const router=express();

router.post('/addexpense',verifyToken,expenseController.createExpense);
router.get('/addexpense',verifyToken,expenseController.getExpenses);
router.delete('/addexpense/:id',verifyToken,expenseController.deleteExpense);

module.exports=router;