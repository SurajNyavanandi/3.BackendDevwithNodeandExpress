const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboard');
const auth = require('../middleware/auth');

router.get('/leaderboard', auth, leaderboardController.getLeaderboard);

module.exports = router;
