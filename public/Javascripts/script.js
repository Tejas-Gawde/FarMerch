// Importing the function
import {createClient} from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
// Create a single supabase client for interacting with your database
const supabase = createClient(
"https://xkbaxhajuykyvvzstdfn.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrYmF4aGFqdXlreXZ2enN0ZGZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ3MDEwNTEsImV4cCI6MjAxMDI3NzA1MX0.ymfXSwBn9oK3-M3e597xHgR-m16H7yyAf1mbmJrbEmw");

// References
var regEmail = document.getElementById("regEmail");
var regPassword = document.getElementById("regPass");
var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPass");
var register = document.getElementById("register");
var login = document.getElementById("login");
var status = document.getElementById("status");
var checkoutbox = document.getElementById("checkout-box");
var cart1 = document.getElementById("cart1");
var cart2 = document.getElementById("cart2");

//Logged in Default
var loggedIn = false;
var UserData;
// Function for creating new user
async function registerUser() {
    const { data, error } = await supabase.auth.signUp({
    email: `${regEmail.value}`,
    password: `${regPassword.value}`,
    })
    if (error) {
        alert(error)
    }
    else {
        alert("Register Successfull");
        console.log(data);
        loggedIn=true;
        logincheck();
    }
}

// Function to login user
async function loginUser(){
    const { data, error } = await supabase.auth.signInWithPassword({
    email: `${loginEmail.value}`,
    password: `${loginPassword.value}`,
    })
    if (error) {
        alert(error)
    }
    else {
        alert("Login Successfull");
        console.log(data);
        loggedIn=true;
        logincheck(data);
    }
}

// FUnction to check login 
async function logincheck(data){
    if(loggedIn){
        status.innerText=`User status : Logged in by email - ${data.user.email}`;
    }
    else return
}

//Function to add to cart
cart1.addEventListener('click', function() {
    // Make an AJAX request to the server to update the cart content
    fetch('/updateCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: 'Product Name', price: '$15' }), // Replace with actual data
    })
      .then((response) => response.json())
      .then((data) => {
        // Create a new product element based on the data received
        const productElement = document.createElement('p');
        productElement.innerHTML = `<a href="#">${data.name}</a> <span class="price">${data.price}</span>`;

        // Append the new product to the cart container
        checkoutbox.appendChild(productElement);
        // Update the cart content with the new data (e.g., the products array)
        // You may need to reload the cart page or use client-side JavaScript to update the cart content
      });
  });
  
// Event Listener
register.addEventListener('click', () => {
    registerUser();
});

login.addEventListener('click',()=>{
    loginUser();
});

cart1.addEventListener('click',()=>{
    addtoCart("Tomatoes", 50);
});

cart1.addEventListener('click',()=>{
    addtoCart("Tomatoes", 50);
});
