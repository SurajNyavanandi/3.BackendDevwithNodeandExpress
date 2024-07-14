const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.createUserSignUp);
router.post('/login', userController.createUserLogin);


module.exports = router;
