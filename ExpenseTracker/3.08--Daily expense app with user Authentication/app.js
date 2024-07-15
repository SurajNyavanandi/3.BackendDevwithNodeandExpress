const express = require('express');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});
app.get('/addexpense', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'expense.html'));
});

//{force:true}
sequelize.sync()
    .then(() => {
        console.log("Database Connected");
        app.listen(8026);
        console.log("Server started running on port 8026");
    })
    .catch((err) => console.log("Error connecting to database"));
