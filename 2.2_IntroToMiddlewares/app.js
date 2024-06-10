const express=require('express');
const bodyParser=require('body-parser');
const app=express();

app.use(bodyParser.urlencoded({extended:false}));
app.use('/',(req,res,next)=>{
   // console.log('This is a middleware');
    next();
})

app.use('/add-product',(req,res,next)=>{
    res.send(`<form action="/product" method="post">
                   <input type="text" name="title" placeholder="Product name">
                   <input type="number" name="size" placeholder="Size">
                   <button type="submit"> Add Product</button>
            </form>`);
})

app.post('/product',(req,res,next)=>{
    console.log(req.body);
    res.redirect('/');
})

app.use('/',(req,res,next)=>{
    res.send('<h1>Hello from Express</h1>');
})
app.listen(7000,()=>console.log(`Server started running on port 7000......`));
