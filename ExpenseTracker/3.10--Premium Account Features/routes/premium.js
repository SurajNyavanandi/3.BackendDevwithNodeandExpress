const express = require('express');
const router = express.Router();
const premiumController = require('../controllers/premium');
const auth = require('../middleware/auth');

router.post('/createOrder', auth, premiumController.createOrder);
router.post('/updateOrderStatus', auth, premiumController.updateOrderStatus);

module.exports = router;
