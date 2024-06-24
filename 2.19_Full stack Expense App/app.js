const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('views'));

app.use('/api/products', productRoutes);

sequelize.sync()
    .then(result => {
        console.log('Database connected!');
        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000');
        });
    })
    .catch(err => {
        console.log(err);
    });
