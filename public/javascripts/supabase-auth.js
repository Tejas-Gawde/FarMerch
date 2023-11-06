// Importing supabase
import { supabase } from "./supabase.js";
// References
var regEmail = document.getElementById("regEmail");
var regPassword = document.getElementById("regPass");
var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPass");
var register = document.getElementById("register");
var login = document.getElementById("login");
var status = document.getElementById("status");

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

// Event Listener
register.addEventListener('click', () => {
    registerUser();
});

login.addEventListener('click',()=>{
    loginUser();
});