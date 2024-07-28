const SibApiV3Sdk = require('sib-api-v3-sdk');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/userModel');
const ForgotPasswordRequest = require('../models/forgotPasswordModel');
const bcrypt = require('bcrypt');

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
//apiKey.apiKey = '';

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const id = uuidv4();
        await ForgotPasswordRequest.create({ id, userId: user.id });

        const resetUrl = `http://localhost:7000/password/resetpassword/${id}`;
        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail({
            to: [{ email }],
            sender: { name: 'Expense Tracker', email: 'your-email@example.com' },
            subject: 'Reset your password',
            htmlContent: `<html><body><p>Click <a href="${resetUrl}">here</a> to reset your password</p></body></html>`,
        });

        await apiInstance.sendTransacEmail(sendSmtpEmail);
        res.status(200).json({ message: 'Password reset email sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error sending password reset email' });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { id, newPassword } = req.body;
        const resetRequest = await ForgotPasswordRequest.findOne({ where: { id, isActive: true } });

        if (!resetRequest) {
            return res.status(400).json({ message: 'Invalid or expired password reset request' });
        }

        const user = await User.findOne({ where: { id: resetRequest.userId } });
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        resetRequest.isActive = false;
        await resetRequest.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error resetting password' });
    }
};
