const Razorpay = require('razorpay');
const Order = require('../models/order');

const razorpay = new Razorpay({
    key_id: 'rzp_test_PnMJD6zIJVFJFg',
    key_secret: 'bonxpWgMC4ETUgtahjlT7VMP'
});

exports.createOrder = async (req, res) => {
    try {
        const amount = 50000; // 50000 paise = INR 500
        const order = await razorpay.orders.create({
            amount,
            currency: "INR",
            receipt: "receipt#1"
        });

        const newOrder = await Order.create({
            orderId: order.id,
            status: 'PENDING',
            userId: req.user.userId
        });

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ Error: 'Creating Razorpay order' });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        const order = await Order.findOne({ where: { orderId } });

        if (status === 'SUCCESS') {
            await order.update({ status: 'SUCCESS' });
            const user = await order.getUser();
            await user.update({ isPremium: true });
        } else {
            await order.update({ status: 'FAILED' });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ Error: 'Updating Razorpay order status' });
    }
};
