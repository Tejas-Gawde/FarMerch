// Imports
import express from 'express';
import dotenv from 'dotenv';
import stripe from 'stripe';
import { fetchData, fetchDataLimit, fetchSingleData, fetchCategory, signUpNewUser, addToCart, fetchID, fetchCartDetails, loginUser, fetchCart } from '../public/javascripts/supabase-backend-functions.js';
import { combineCartAndProductData } from '../public/javascripts/backend-functions.js';

dotenv.config();
// Declaration
let cartdata = [];
var router = express.Router();

const stripeGateway = stripe(process.env.STRIPE_API_KEY);
const DOMAIN = process.env.DOMAIN;

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
  const { cartData } = req.body;
  console.log('cartdaata is', cartData);
  const response = await addToCart(cartData);
  res.send(response);
})

router.post('/login', async (req, res) => {
  const { Email, Password } = req.body;
  await loginUser(Email, Password);
  res.send("nice");
})

router.post('/register', async (req, res) => {
  const { Email, Password, Username } = req.body;
  await signUpNewUser(Email, Password, Username);
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

router.get('/cart', async (req, res) => {
  const cart = await fetchCart();
  if (cart) {
    console.log(cart);
    const cartItems = await fetchCartDetails(cart.map(item => item.id));
    const finalCart = combineCartAndProductData(cart, cartItems);
    res.render("cart", { finalCart });
  }
  else {
    res.render("cart", { finalCart: [] });
  }
});

router.post('/stripe-checkout', async (req, res) => {
  const cart = await fetchCart();
  const cartItems = await fetchCartDetails(cart.map(item => item.id));
  const finalCart = combineCartAndProductData(cart, cartItems);
  const finalProduct = finalCart.map(item => ({
    price_data: {
      currency: 'inr',
      product_data: {
        name: item.name,
        images: [item.url]
      },
      unit_amount: Math.round(item.price * 100), // Convert price to cents and round
    },
    quantity: item.quantity,
  }));
  try {
    const session = await stripeGateway.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: finalProduct,
      mode: 'payment',
      success_url: `${DOMAIN}/success`,
      cancel_url: `${DOMAIN}/cancel`,
    });
    res.json({ sessionUrl: session.url });
  } catch (error) {
    console.error('Error creating Stripe Checkout session:', error);
    res.status(500).json({ error: 'Failed to create Stripe Checkout session' });
  }
});

// Route handler for handling payment success
router.get('/success', (req, res) => {
  res.render('success'); // Render success page
});

// Route handler for handling payment cancellation
router.get('/cancel', (req, res) => {
  res.render('cancel'); // Render cancellation page
});

export default router;