const express=require('express');
const adminRoutes=require('./routes/admin');
const shopRoutes=require('./routes/shop');
const bodyParser=require('body-parser');
const app=express();

app.use(bodyParser.urlencoded({extended:false}));

//Routes
app.use('/admin',adminRoutes);
app.use('/shop',shopRoutes);

//ErrorHandling
app.use((req,res,next)=>{
    res.status(404).send('<h1>Page Not Found</h1>');
})



app.listen(7000,()=>console.log(`Server started running on port 7000......`));
