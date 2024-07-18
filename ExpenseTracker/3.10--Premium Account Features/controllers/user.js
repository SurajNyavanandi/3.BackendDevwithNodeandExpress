const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createSignUp = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashPassword});
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({Error: 'Error posting the sign up details'});
    }
};

exports.createLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            res.status(404).json({Error: 'User does not exist'});
        } 
        const passwordFound = await bcrypt.compare(password, user.password);
        if(!passwordFound){
            res.status(401).json({Error:'Incorrect password'});
        }
        const token = await jwt.sign({userId: user.id, email: email}, 'secret@key');
        res.status(200).json({Message: 'Login Successful', token, isPremium: user.isPremium});
        
    } catch (error) {
        res.status(500).json({Error: 'Error posting login details'});
    }
};

exports.getLeaderboard = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, 'secret@key');
        const user = await User.findByPk(decodedToken.userId);

        if (!user.isPremium) {
            return res.status(403).json({Error: 'Access denied. Premium membership required.'});
        }

        const users = await User.findAll();
        const leaderboard = await Promise.all(users.map(async (user) => {
            const totalExpenses = await user.getTotalExpenses();
            return {
                name: user.name,
                totalExpenses
            };
        }));
        leaderboard.sort((a, b) => b.totalExpenses - a.totalExpenses);
        res.status(200).json(leaderboard);
    } catch (error) {
        res.status(500).json({Error: 'Error getting leaderboard'});
    }
};
