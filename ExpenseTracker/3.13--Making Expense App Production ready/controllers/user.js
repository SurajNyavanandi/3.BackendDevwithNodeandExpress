const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../config/database'); 

exports.createSignUp = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { name, email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        
        // Create user with hashed password
        const user = await User.create({ name, email, password: hashPassword }, { transaction });
        
        await transaction.commit();
        res.status(201).json(user);
        // { id: user.id, name: user.name, email: user.email }
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ Error: 'Error posting the sign up details' });
    }
};

exports.createLogin = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email: email }, transaction });

        if (!user) {
            await transaction.rollback();
            res.status(404).json({ Error: 'User does not exist' });
            return;
        }

        const passwordFound = await bcrypt.compare(password, user.password);
         // if (password !== user.password) {
        //     res.status(401).json({Error: 'Incorrect password'});
        // }
        if (!passwordFound) {
            await transaction.rollback();
            res.status(401).json({ Error: 'Incorrect password' });
            return;
        }

        const token = await jwt.sign({ userId: user.id, email: email }, 'secret@key');
        await transaction.commit();
        res.status(200).json({
            Message: 'Login Successful',
            token,
            isPremium: user.isPremium
        });

    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ Error: 'Error posting login details' });
    }
};



