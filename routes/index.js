// Imports
const express = require('express');
const supabase = require('../public/javascripts/supabase.js');

// Declarations
var itemArray;
let cartdata = [];
var singleItem;

// Functions
async function fetchDataLimit(){
  let { data: items, error } = await supabase.from('items')
  .select('*')
  .limit(6)
  if (error) {
    console.log(error)
  }
  else {
    console.log("success");
    itemArray = items
  }
}

async function fetchData(){
  let { data: items, error } = await supabase.from('items')
  .select('*')
  if (error) {
    console.log(error)
  }
  else {
    console.log("success");
    itemArray = items
  }
}

async function fetchSingleData(itemName){
  let { data: items, error } = await supabase.from('items')
  .select()
  .eq('name', itemName)
  if (error) {
    console.log(error)
  }
  else {
    console.log("got single data");
    singleItem = items[0]
  }
}

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  fetchDataLimit();
  setTimeout(()=>{
    res.render('index', {itemArray});
  }, 2000)
});

router.get('/products',(req, res)=>{
  fetchData();
  setTimeout(()=>{
    res.render("products",{itemArray});
  }, 2000)
});

router.post('/products',(req, res)=>{
  const { itemName, itemPrice } = req.body;
  cartdata.push({itemName: itemName, itemPrice: itemPrice})
  console.log(cartdata);
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
  const itemName = req.params.item;
  fetchSingleData(itemName);
  console.log(singleItem);
  setTimeout(()=>{
    res.render("productpage",{singleItem});
  }, 1500)
})

router.get('/cart',(req, res)=>{
  console.log(cartdata);
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

router.get('/productpage',(req, res)=>{
  res.render("productpage");
});

router.get('/success',(req, res)=>{
  res.render("success");
});

module.exports = router;