import { getSession } from "./supabase-fetch-functions.js";
import { supabase } from "./supabase.js";

async function fetcharray(UserID) {
    let { data: users, error } = await supabase
        .from('users')
        .select('cartID, cartQuantity')
        .eq('userID', UserID)
        .single()
    console.log("Fetching cart array for user: ", users);
    return users;
}

export async function addToCart(id, quantity) {
    const UserID = await getSession();
    if (UserID == null) {
        return 'No user logged in'
    }
    const fetchedArray = await fetcharray(UserID);
    console.log(fetchedArray);
    fetchedArray.cartID.push(id)
    fetchedArray.cartQuantity.push(quantity)
    const { data, error } = await supabase
        .from('users')
        .update({ cartID: fetchedArray.cartID, cartQuantity: fetchedArray.cartQuantity })
        .eq('userID', UserID)
        .select()
    if (error) {
        alert(error)
    }
    console.log(data)
    return 'Item added to cart!'
}

export async function loginUser(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })
    if (error) {
        alert(error)
    }
    else {
        getSession();
    }
}

export async function getNameandPrice(id) {
    const { data, error } = await supabase
        .from('items')
        .select('name, price')
        .in('id', id)
    if (error) console.log(error)
    else return data;
}

export async function fetchID() {
    const UserID = await getSession();
    const { data, error } = await supabase
        .from('users')
        .select('cartID')
        .eq('userID', UserID)
        .single()
    if (error) console.log(error)
    else {
        return data.cartID;
    }
}
