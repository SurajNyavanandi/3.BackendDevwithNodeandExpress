const express=require('express');
const userRoutes=require('./routes/userRoutes');
const bodyParser=require('body-parser');
const sequelize=require('./config/database');
const app=express();

app.use(express.static('views'));
app.use(bodyParser.json());
app.use('/user',userRoutes);

sequelize.sync()
         .then((res)=>{
              console.log("Database Connected");
              app.listen(8026);
              console.log("Server started running on port 8026");
         })
         .catch((err)=>console.log("Error connecting to database"));
