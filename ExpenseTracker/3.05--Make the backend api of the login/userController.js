const  SignUp = require('../models/index');

exports.createUserSignUp = async (req, res) => {
   try {  
           const user = await SignUp.create(req.body);
           res.status(201).json(user);
   } catch (error) {
       res.status(500).send({ Error: 'Creating sign up details' });
   }
};


exports.createUserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await SignUp.findOne({ where: { email: email } });

        if(!user) {
            return res.status(404).json({ Message: 'User not found' });
        }

        if(user.password !== password) {
            return res.status(401).json({ Messsage: 'User not authorized' });
        }

        res.status(200).json({ Message: 'User login successful' });
    } catch (error) {
        res.status(500).send({ Error: 'Error checking login details' });
    }
};

