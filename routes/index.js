const express = require('express');
const supabase = require('../public/javascripts/supabase.js') ;
var itemArray = null;
async function fetchData(){
    let { data: items, error } = await supabase.from('items')
  .select('*')
  if (error) {
    alert(error)
}
else {
    console.log("success");
    itemArray = items
}
}

var router = express.Router();
//Declaration of data
let cartdata = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {itemArray});
});

router.get('/products',(req, res)=>{
  fetchData();
  res.render("products",{itemArray});
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

router.get('/upload',(req, res)=>{
  res.render("upload");
});

router.get('/vegetable',(req, res)=>{
  res.render("vegetable");
});

router.get('/fruits',(req, res)=>{
  res.render("fruits");
});

router.get('/fruits',(req, res)=>{
  res.render("fruits");
});

module.exports = router;