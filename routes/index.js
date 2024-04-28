// Imports
import express from "express";
import dotenv from "dotenv";
import stripe from "stripe";
import {
    fetchData,
    fetchDataLimit,
    fetchSingleData,
    fetchCategory,
    signUpNewUser,
    addToCart,
    fetchCartDetails,
    loginUser,
    fetchCart,
    updateCart,
    loginSeller,
    signUpNewSeller,
    getuserType,
    fetchLowStockItems,
    uploadItem,
    getLogin,
    signOutUser,
} from "../public/javascripts/supabase-backend-functions.js";
import {
    combineCartAndProductData,
    removeFromCart,
    updateCartQuantity,
} from "../public/javascripts/backend-functions.js";
import multer from "multer";

//Router
var router = express.Router();

//Configs
const stripeGateway = stripe(process.env.STRIPE_API_KEY);
const DOMAIN = process.env.DOMAIN;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 } });
dotenv.config();

//Logincheck Middleware
router.use(async (req, res, next) => {
    const user = await getLogin();
    if (user) {
        req.body.user = user;
    }
    else console.log("No user logged in");
    next();
});

//GET requests
router.get("/", async (req, res, next) => {
    let user = null;
    if (req.body.user) {
        user = req.body.user;
    }
    const itemArrayLimit = await fetchDataLimit();
    res.render("index", { itemArrayLimit, user });
});

router.get("/products", async (req, res) => {
    let user = null;
    if (req.body.user) {
        user = req.body.user;
    }
    const itemArray = await fetchData();
    res.render("products", { itemArray, user });
});

router.get("/products/:item", async (req, res) => {
    let user = null;
    if (req.body.user) {
        user = req.body.user;
    }
    const itemName = req.params.item;
    const singleItem = await fetchSingleData(itemName);
    res.render("productpage", { singleItem, user });
});

router.get("/category=:categoryName", async (req, res) => {
    let user = null;
    if (req.body.user) {
        user = req.body.user;
    }
    const itemName = req.params.categoryName;
    const categoryData = await fetchCategory(itemName);
    res.render("category", { categoryData, itemName, user });
});

router.get("/stockhistory", async (req, res) => {
    const state = await getuserType();
    if (state == "Seller") {
        const items = await fetchLowStockItems();
        console.log(items)
        res.render("stockhistory", { items });
    } else {
        const message = "Seller";
        res.render("nologin", { message });
    }
});

router.get("/upload", async (req, res) => {
    const state = await getuserType();
    if (state == "Seller") {
        res.render("upload");
    } else {
        const message = "Seller";
        res.render("nologin", { message });
    }
});

router.get("/cart", async (req, res) => {
    let user = null;
    if (req.body.user) {
        user = req.body.user;
    }
    const cart = await fetchCart();
    if (cart) {
        console.log(cart);
        const cartItems = await fetchCartDetails(cart.map((item) => item.id));
        const finalCart = combineCartAndProductData(cart, cartItems);
        res.render("cart", { finalCart, user });
    } else {
        res.render("cart", { finalCart: [], user });
    }
});

router.get("/about-us", (req, res) => {
    let user = null;
    if (req.body.user) {
        user = req.body.user;
    }
    res.render("aboutus", { user });
});

router.get("/contact-us", (req, res) => {
    let user = null;
    if (req.body.user) {
        user = req.body.user;
    }
    res.render("contact", { user });
});

router.get("/customer", (req, res) => {
    res.render("customerpage");
});

router.get("/seller", (req, res) => {
    res.render("sellerpage");
});

router.get("/success", (req, res) => {
    let user = null;
    if (req.body.user) {
        user = req.body.user;
    }
    res.render("success", { user });
});

router.get("/cancel", (req, res) => {
    let user = null;
    if (req.body.user) {
        user = req.body.user;
    }
    res.render("cancel", { user });
});

//POST requests
router.get
    ("/logout", async (req, res) => {
        await signOutUser();
        res.redirect("/");
    })
router.post("/addtocart", async (req, res) => {
    const { cartData } = req.body;
    console.log("cartdaata is", cartData);
    const response = await addToCart(cartData);
    res.send(response);
});

router.post("/login", async (req, res) => {
    const { Email, Password } = req.body;
    const message = await loginUser(Email, Password);
    if (message == "User logged in successfully") res.send(JSON.stringify(message));
    else res.status(401).send(JSON.stringify(message));
});

router.post("/register", upload.single("KisanCard"), async (req, res) => {
    const { Email, Password, Username } = req.body;
    const kisanCardFile = req.file;
    const message = await signUpNewUser(Email, Password, Username, kisanCardFile);
    if (message == "Account created successfully") res.send(JSON.stringify(message));
    else res.status(401).send(JSON.stringify(message));
});

router.post("/sellerLogin", async (req, res) => {
    const { Email, Password } = req.body;
    console.log(Email, Password);
    const message = await loginSeller(Email, Password);
    if (message == "Seller logged in successfully") res.send(JSON.stringify(message));
    else res.status(401).send(JSON.stringify(message));
});

router.post("/sellerRegister", async (req, res) => {
    const { Email, Password, Username } = req.body;
    const message = await signUpNewSeller(Email, Password, Username);
    if (message == "Seller account created successfully") res.send(JSON.stringify(message));
    else res.status(401).send(JSON.stringify(message));
});

router.post("/update-cart", async (req, res) => {
    const { id, quantity } = req.body;
    const cart = await fetchCart();
    const newCart = updateCartQuantity(cart, id, quantity);
    await updateCart(newCart);
    res.send("nice");
});

router.post("/remove-from-cart", async (req, res) => {
    const { id } = req.body;
    const cart = await fetchCart();
    const newCart = removeFromCart(cart, id);
    await updateCart(newCart);
    res.send("nice");
});

router.post("/upload", async (req, res) => {
    const message = await uploadItem(req.body)
    res.send(JSON.stringify(message));
})

router.post("/stripe-checkout", async (req, res) => {
    const cart = await fetchCart();
    const cartItems = await fetchCartDetails(cart.map((item) => item.id));
    const finalCart = combineCartAndProductData(cart, cartItems);
    const finalProduct = finalCart.map((item) => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: item.name,
                images: [item.url],
            },
            unit_amount: Math.round(item.price * 100), // Convert price to cents and round
        },
        quantity: item.quantity,
    }));
    try {
        const session = await stripeGateway.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: finalProduct,
            mode: "payment",
            success_url: `${DOMAIN}/success`,
            cancel_url: `${DOMAIN}/cancel`,
        });
        res.json({ sessionUrl: session.url });
    } catch (error) {
        console.error("Error creating Stripe Checkout session:", error);
        res.status(500).json({
            error: "Failed to create Stripe Checkout session",
        });
    }
});

export default router;
