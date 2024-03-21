// Importing supabase
import { supabase } from "./supabaseEsm.js";
import { getSession } from "./supabase-global-functions.js";

// References
var regEmail = document.getElementById("regEmail");
var regPassword = document.getElementById("regPass");
var regName = document.getElementById("regName");
var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPass");
var register = document.getElementById("register");
var login = document.getElementById("login");
var status = document.getElementById("status");

//Logged in Default
var loggedIn = false;
var UserData;

// Function for creating new user
async function signUpNewUser() {
    const { data, error } = await supabase.auth.signUp({
        email: regEmail.value,
        password: regPassword.value,
        options: {
            data: {
                display_name: regName.value,
            },
        },
    });
    if (error) {
        console.log(error.messaage);
    } else {
        alert("done successfully");
        const userId = await getSession();
        await createUserRow(userId);
    }
}

async function createUserRow(value) {
    const { data, error } = await supabase
        .from("users")
        .insert([{ userID: value }])
        .select();
    if (error) {
        console.log(error.message);
    } else {
        console.log("successfully created user row");
    }
}

// Function to login user
async function loginUser() {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: `${loginEmail.value}`,
        password: `${loginPassword.value}`,
    })
    if (error) {
        alert(error)
    }
    else {
        alert("Login Successfull");
        getSession();
    }
}

// Event Listener
register.addEventListener('click', () => {
    signUpNewUser();
});

login.addEventListener('click', () => {
    loginUser();
});