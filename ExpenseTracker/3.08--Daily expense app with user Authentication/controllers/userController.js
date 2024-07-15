const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SignUp = require('../models/index');

exports.createUserSignUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await SignUp.create({ username, email, password: hashedPassword });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).send({ Error: 'Creating sign up details' });
    }
};

exports.createUserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await SignUp.findOne({ where: { email: email } });

        if (!user) {
            return res.status(404).json({ Error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ Error: 'User not authorized/Invalid password' });
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, 'expresskeysecrect');
        res.status(200).json({ Message: 'User login successful', token, redirect: '/addexpense' });
    } catch (error) {
        res.status(500).send({ Error: 'Error checking login details' });
    }
};
