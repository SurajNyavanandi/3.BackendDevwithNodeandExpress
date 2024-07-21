const User = require('../models/user');

exports.getLeaderboard = async (req, res) => {
    try {
        const users = await User.findAll({
            order: [['totalAmount', 'DESC']], 
            attributes: ['name', 'totalAmount'] 
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ Error: 'Error fetching leaderboard' });
    }
};
