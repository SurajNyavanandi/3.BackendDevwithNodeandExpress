const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/signup', userController.createUser);
router.post('/login',userController.createLogin);

module.exports = router;
