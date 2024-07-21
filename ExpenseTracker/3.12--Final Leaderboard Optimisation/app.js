const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const premiumRoutes = require('./routes/premium'); 
const leaderboardRoutes = require('./routes/leaderboard');


const path = require('path');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);
app.use('/premium', premiumRoutes);
app.use('/leaderboard', leaderboardRoutes);

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
    .then((res) => {
        console.log("Database Connected");
        app.listen(7026,()=>console.log("http://localhost:7026/login"));
    })
    .catch((err) => {
        console.log("Error connecting to database");
    });
