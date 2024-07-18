const express=require('express');
const controllers=require('../controllers/user');
const router=express.Router();

router.post('/signup',controllers.createSignUp);
router.post('/login',controllers.createLogin);
router.get('/leaderboard', controllers.getLeaderboard); 
module.exports=router;