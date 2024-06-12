const express = require('express');
const contactController = require('../controllers/contactController');
const successController = require('../controllers/successController');
const router = express.Router();

router.get('/contactus', contactController.getContactForm);
router.post('/contactus', contactController.postContactForm);
router.get('/success', successController.getSuccessPage);

module.exports = router;

