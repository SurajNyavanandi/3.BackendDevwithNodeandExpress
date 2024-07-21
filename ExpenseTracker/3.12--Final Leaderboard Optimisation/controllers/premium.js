const Razorpay = require('razorpay');
const Order = require('../models/order');
const User = require('../models/user');

const razorpay = new Razorpay({
    key_id: 'rzp_test_PnMJD6zIJVFJFg',
    key_secret: 'bonxpWgMC4ETUgtahjlT7VMP'
});
//key_id=rzp_test_PnMJD6zIJVFJFg         key_secret=bonxpWgMC4ETUgtahjlT7VMP

exports.createOrder = async (req, res) => {
    try {
        const amount = 50000; 
        const currency = 'INR';
        const options = { amount, currency };
        const order = await razorpay.orders.create(options);
        //console.log(order);//amount,amount due,status,......
        await Order.create({ orderId: order.id, status: 'PENDING', userId: req.user.userId });
        res.status(201).json({ orderId: order.id });
    } catch (error) {
        res.status(500).json({ Error: 'Error creating order' });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { order_id, status } = req.body;
        const order = await Order.findOne({ where: { orderId: order_id } });
        // console.log(order);
        // console.log("Before order status",order.status);
      
        if (!order) {
            return res.status(404).json({ Error: 'Order not found' });
        }
        order.status = status;
        await order.save();

        //console.log(order);
        //console.log("After order status",order.status);

        if (status === 'SUCCESSFUL') {
            const user = await User.findByPk(req.user.userId);
            user.isPremium = true;
            await user.save();
           //req.user.userId,(via middleware),Fetch-Update-Save
          
        }

        res.status(200).json({ message: 'Order status updated' });
    } catch (error) {
        res.status(500).json({ Error: 'Error updating order status' });
    }
};
