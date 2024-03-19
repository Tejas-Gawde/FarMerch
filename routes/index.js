// Imports
import express from 'express';
import { fetchData, fetchDataLimit, fetchSingleData } from '../public/javascripts/supabase-fetch-functions.js';

// Declaration
let cartdata = [];


var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  const itemArrayLimit = await fetchDataLimit();
  res.render('index', { itemArrayLimit });
});

router.get('/products', async (req, res) => {
  const itemArray = await fetchData();
  res.render("products", { itemArray });
});

router.get('/products/:item', async (req, res) => {
  const itemName = req.params.item;
  const singleItem = await fetchSingleData(itemName);
  res.render("productpage", { singleItem });
})

router.post('/products', (req, res) => {
  const { itemName, itemPrice } = req.body;
  cartdata.push({ itemName: itemName, itemPrice: itemPrice })
  console.log(cartdata);
})

router.get('/about-us', (req, res) => {
  res.render("aboutus");
});

router.get('/contact-us', (req, res) => {
  res.render("contact");
});

router.get('/customer', (req, res) => {
  res.render("customerpage");
});

router.get('/seller', (req, res) => {
  res.render("sellerpage");
});

router.get('/cart', (req, res) => {
  console.log(cartdata);
  res.render("cart", { cartdata });
});

router.get('/upload', (req, res) => {
  res.render("upload");
});

router.get('/vegetable', (req, res) => {
  res.render("vegetable");
});

router.get('/fruits', (req, res) => {
  res.render("fruits");
});

router.get('/productpage', (req, res) => {
  res.render("productpage");
});

export default router;