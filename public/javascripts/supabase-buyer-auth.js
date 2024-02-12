//Importing Supabase
import supabase from "./supabaseEsm.js";   

//Declarations
var userId;

//References
var regName = document.getElementById("regName");
var regEmail = document.getElementById("regEmail");
var regPassword = document.getElementById("regPass");
var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPass");
var register = document.getElementById("register");
var login = document.getElementById("login");
var status = document.getElementById("status");

async function registerUser() {    
    const { data, error } = await supabase
    .from('users')
    .insert([
    { username: regName.value , email: regEmail.value, password: regPassword.value },
    ])
    if(error){
        console.log(error)
    }
    else{
        alert("Register Successfull");
    }
}
async function loginUser(){
    let { data: users, error } = await supabase
    .from('users')
    .select("*")
    .eq('email', loginEmail.value)
    .eq('password', loginPassword.value)
    .single()
    if(error){
        console.log(error)
    }
    else{
        console.log(users)
        userId = users.id;
    }
}
async function updateCart(){
    const { data, error } = await supabase
    .from('users')
    .update({ other_column: 'otherValue' })
    .eq('some_column', 'someValue')
    .select()
}

//EventListeners
register.addEventListener('click',()=>{
    registerUser();
})
login.addEventListener('click',()=>{
    loginUser();
})

export default userId;