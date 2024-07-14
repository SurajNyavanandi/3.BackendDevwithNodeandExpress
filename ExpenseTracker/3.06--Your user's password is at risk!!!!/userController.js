const bcrypt = require('bcrypt');
const SignUp = require('../models/index'); // Adjust according to your actual path

exports.createUserSignUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
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

        res.status(200).json({ Message: 'User login successful' });
    } catch (error) {
        res.status(500).send({ Error: 'Error checking login details' });
    }
};



