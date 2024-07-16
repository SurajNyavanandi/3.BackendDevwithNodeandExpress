const express = require('express');
const router = express.Router();
const controllers = require('../controllers/expense');
const orderControllers = require('../controllers/order');
const authenticationToken = require('../middleware/auth');

router.post('/addexpense', authenticationToken, controllers.createExpense);
router.get('/addexpense', authenticationToken, controllers.getExpenses);
router.delete('/addexpense/:id', authenticationToken, controllers.deleteExpense);
router.post('/createOrder', authenticationToken, orderControllers.createOrder);
router.post('/updateOrder', authenticationToken, orderControllers.updateOrder);

module.exports = router;
