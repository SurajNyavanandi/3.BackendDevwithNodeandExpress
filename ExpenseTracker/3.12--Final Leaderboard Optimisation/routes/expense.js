const express=require('express');
const router=express.Router();
const controllers=require('../controllers/expense');
const authenticationToken=require('../middleware/auth');

router.post('/addexpense',authenticationToken,controllers.createExpense);
router.get('/addexpense',authenticationToken,controllers.getExpenses);
router.delete('/addexpense/:id',authenticationToken,controllers.deleteExpense);

module.exports=router;