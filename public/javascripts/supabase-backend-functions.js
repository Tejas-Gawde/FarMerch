import { sortCart } from "./backend-functions.js";
import { supabase } from "./supabase.js";

export async function fetchDataLimit() {
    let { data: items, error } = await supabase.from('items')
        .select('*')
        .limit(6)
    if (error) {
        console.log(error)
    }
    else {
        console.log("success");
        return items
    }
}

export async function fetchData() {
    let { data: items, error } = await supabase.from('items')
        .select('*')
    if (error) {
        console.log(error)
    }
    else {
        console.log("success");
        return items
    }
}

export async function fetchSingleData(itemName) {
    let { data: items, error } = await supabase.from('items')
        .select()
        .eq('name', itemName)
        .single()
    if (error) {
        console.log(error)
    }
    else {
        console.log("got single data");
        return items;
    }
}

export async function fetchCategory(categoryName) {
    let { data: items, error } = await supabase.from('items')
        .select()
        .eq('category', categoryName)
    if (error) {
        console.log(error)
    }
    else {
        console.log("got category data");
        return items
    }
}

export async function getSession() {
    const { data, error } = await supabase.auth.getSession()
    if (data.session != null) {
        console.log('Session:', data.session.user.id);
        return data.session.user.id;
    }
    else console.log('No session found');
}

export async function signUpNewUser(email, password, username) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                display_name: username,
            },
        },
    });
    if (error) {
        console.log(error.messaage);
    } else {
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

export async function fetcharray(UserID) {
    let { data: users, error } = await supabase
        .from('users')
        .select('cart')
        .eq('userID', UserID)
        .single()
    console.log("Fetching cart array for user: ", users);
    return users;
}

export async function addToCart(cartData) {
    const UserID = await getSession();
    if (UserID == null) {
        return 'No user logged in'
    }
    const fetchedArray = await fetcharray(UserID);
    fetchedArray.cart.push(cartData)
    const cart = sortCart(fetchedArray.cart);
    console.log('sorted cart is', cart);
    const { data, error } = await supabase
        .from('users')
        .update({ cart: cart })
        .eq('userID', UserID)
        .select()
    if (error) {
        console.log(error)
    }
    else return 'Item added to cart!'
}

export async function loginUser(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })
    if (error) {
        console.log(error)
    }
    else {
        getSession();
    }
}

export async function fetchCartDetails(id) {
    const { data, error } = await supabase
        .from('items')
        .select('name, price, availableIn, url, id')
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

export async function fetchCart() {
    const UserID = await getSession();
    const { data, error } = await supabase
        .from('users')
        .select('cart')
        .eq('userID', UserID)
        .single()
    if (error) console.log(error)
    else {
        return data.cart;
    }
}

export async function updateCart(cart) {
    const UserID = await getSession();
    const { data, error } = await supabase
        .from('users')
        .update({ cart: cart })
        .eq('userID', UserID)
        .select()
    if (error) {
        console.log(error)
    }
    return 'Cart Updated'
}


///// BE SURE TO REPLACE fetchCart and fetchArray..... (Pending)

