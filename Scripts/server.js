const express = require('express');
const app = express();

app.set("view engine", "ejs");
app.use(express.static('./public'));
app.use(express.json());

app.get('/',(req, res)=>{
    res.render("index");
});

app.get('/products',(req, res)=>{
    res.render("products");
});

app.get('/about-us',(req, res)=>{
    res.render("aboutus");
});

app.get('/contact-us',(req, res)=>{
    res.render("contact");
});

app.get('/customer',(req, res)=>{
    res.render("buyerpage");
});

app.get('/seller',(req, res)=>{
    res.render("sellerpage");
});

app.get('/products/:item',(req, res)=>{
    const item = req.params.item;
    const price = Math.floor(Math.random() * (100 - 50) + 50);
    res.render("sproduct",{item, price});
})
app.listen(3000);