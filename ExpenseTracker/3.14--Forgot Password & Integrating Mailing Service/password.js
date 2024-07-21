const nodemailer = require('nodemailer');
const User = require('../models/user');
require('dotenv').config();

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).json({ Error: 'User does not exist' });
        }

        const transporter = nodemailer.createTransport({
            service: 'Sendinblue', 
            auth: {
                user: 'krisurajdec@gmail.com', 
                pass: process.env.SENDINBLUE_API_KEY 
            }
        });

        const mailOptions = {
            from: 'krisurajdec@gmail.com',
            to: email,
            subject: 'Password Reset',
            text: 'This is a dummy password reset email.'
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ Message: 'Password reset email sent' });
    } catch (error) {
        res.status(500).json({ Error: 'Error sending password reset email' });
    }
};
