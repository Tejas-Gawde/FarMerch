// Importing the function
import {createClient} from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
// Create a single supabase client for interacting with your database
const supabase = createClient(
"https://xkbaxhajuykyvvzstdfn.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrYmF4aGFqdXlreXZ2enN0ZGZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ3MDEwNTEsImV4cCI6MjAxMDI3NzA1MX0.ymfXSwBn9oK3-M3e597xHgR-m16H7yyAf1mbmJrbEmw"
);

// References
var regEmail = document.getElementById("regEmail");
var regPassword = document.getElementById("regPass");
var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPass");
var register = document.getElementById("register");
var login = document.getElementById("login");

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
    }
}

// Event Listener
register.addEventListener('click', () => {
    registerUser();
});

login.addEventListener('click',()=>{
    loginUser();
});