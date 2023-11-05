var express = require('express');
var router = express.Router();

//Declaration of data
let cartdata = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/products',(req, res)=>{
  res.render("products");
});

router.post('/products',(req, res)=>{
  const { parcel } = req.body;
  cartdata.push({itemName: parcel})
})

router.get('/about-us',(req, res)=>{
  res.render("aboutus");
});

router.get('/contact-us',(req, res)=>{
  res.render("contact");
});

router.get('/customer',(req, res)=>{
  res.render("buyerpage");
});

router.get('/seller',(req, res)=>{
  res.render("sellerpage");
});

router.get('/products/:item',(req, res)=>{
  const item = req.params.item;
  const price = Math.floor(Math.random() * (100 - 50) + 50);
  res.render("sproduct",{item, price});
})

router.get('/cart',(req, res)=>{
  res.render("cart",{cartdata});
});


module.exports = router;
