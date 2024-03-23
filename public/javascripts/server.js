/*import  express  from "express";
import dotenv from 'dotenv';
import stripe from 'stripe';
dotenv.config();


const app=express();
app.use(express.static('public'));
app.use(express.json());

app.get("/",(req,res)=>{
    res.sendFile("productpage.ejs",{root:"public"});
});

app.get("/success",(req,res)=>{
    res.sendFile("success.ejs",{root:"public"});
});

app.get("/cancel",(req,res)=>{
    res.sendFile("cancel.ejs",{root:"public"});
});

let stripeGateway=stripe(process.env.stripe_api);
let DOMAIN= process.env.DOMAIN;

app.post('/stripe-checkout',async(req,res) => {
    const lineItems= req.body.item.map((item) => {
        const unitAmount= parseInt(itemPrice.replace(/[^0-9. -]+/g,"")*100);
        console.log("item-price:",itemPrice);
        console.log("unitAmount:",unitAmount);
        return{
            price_data: {
                currency:'rs',
                product_data: {
                    name: itemName
                },
            },
        };
    });

   const session = await stripeGateway.checkout.sessions.create({
    payment_method_types:["card"],
    mode:"payment",
    success_url:'${DOMAIN}/success',
    cancel_url:'${DOMAIN}/cancel',
    line_items: lineItems,
    bill_address_collection:'required',
   });
   res.json(session.url);  
});



app.listen(3000,() => {
    console.log("Listening on port 3000;");
});*/

import express from 'express';
import dotenv from 'dotenv';
import stripe from 'stripe';

dotenv.config();

const app = express();
app.use(express.static('public'));
app.use(express.json());

const stripeGateway = stripe(process.env.STRIPE_API_KEY);
const DOMAIN = process.env.DOMAIN; 



// Route handler for creating a Stripe Checkout session
app.post('/stripe-checkout', async (req, res) => {
    const lineItems = req.body.items.map((item) => {
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: 'Tomatoes',

                },
                unit_amount: 50 * 100, // Convert item price to cents
            },
            quantity: 1,
        };
    });

    try {
        const session = await stripeGateway.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
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
app.get('/success', (req, res) => {
    res.render('success'); // Render success page
});

// Route handler for handling payment cancellation
app.get('/cancel', (req, res) => {
    res.render('cancel'); // Render cancellation page
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
