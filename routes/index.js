// Imports
import express from 'express';
import { fetchData, fetchDataLimit, fetchSingleData, fetchCategory } from '../public/javascripts/supabase-fetch-functions.js';
import { addToCart, fetchID, getNameandPrice, loginUser } from '../public/javascripts/supabase-add.js';

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

router.get('/category=:categoryName', async (req, res) => {
  const itemName = req.params.categoryName;
  const categoryData = await fetchCategory(itemName);
  res.render("category", { categoryData, itemName });
})

router.post('/products', (req, res) => {
  const { itemName, itemPrice } = req.body;
  cartdata.push({ itemName: itemName, itemPrice: itemPrice })
  console.log(cartdata);
})

router.post('/addtocart', async (req, res) => {
  const { productId, productQuantity } = req.body;
  console.log(productId, productQuantity);
  res.send(await addToCart(productId, productQuantity));
})

router.post('/login', async (req, res) => {
  const { Email, Password } = req.body;
  loginUser(Email, Password);
  res.send("nice");
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

router.get('/cart', async (req, res) => {
  const cartArray = await getNameandPrice(await fetchID());

  res.render("cart", { cartArray });
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

router.get('/cancel', (req, res) => {
  res.render("cancel");
});
router.get('/success', (req, res) => {
  res.render("success");
});
export default router;