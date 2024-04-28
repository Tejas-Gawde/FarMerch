import { sortCart } from "./backend-functions.js";
import { supabase } from "./supabase.js";

export async function fetchDataLimit() {
    let { data: items, error } = await supabase
        .from("items")
        .select("*")
        .limit(6);
    if (error) {
        console.log(error);
    } else {
        console.log("success");
        return items;
    }
}

export async function fetchData() {
    let { data: items, error } = await supabase.from("items").select("*");
    if (error) {
        console.log(error);
    } else {
        console.log("success");
        return items;
    }
}

export async function fetchLowStockItems() {
    let { data: items, error } = await supabase.from("items").select("*").lte("stock", 20)
    if (error) {
        console.log(error);
    } else {
        console.log("got low stock items");
        return items;
    }
}

export async function fetchSingleData(itemName) {
    let { data: items, error } = await supabase
        .from("items")
        .select()
        .eq("name", itemName)
        .single();
    if (error) {
        console.log(error);
    } else {
        console.log("got single data");
        return items;
    }
}

export async function fetchCategory(categoryName) {
    let { data: items, error } = await supabase
        .from("items")
        .select()
        .eq("category", categoryName);
    if (error) {
        console.log(error);
    } else {
        console.log("got category data");
        return items;
    }
}

export async function uploadItem(item) {
    const sellerName = await getSellerName();
    const { data, error } = await supabase
        .from('items')
        .insert([
            {
                category: item.Category,
                name: item.Name,
                price: item.Price,
                stock: item.Stock,
                availableIn: item.AvailableIn,
                url: item.Url,
                descp1: item.Description,
                seller: sellerName,
            },
        ])
        .select();
    if (error) {
        console.log(error);
        return error;
    }
    else {
        console.log(data);
        return "Item uploaded";
    }
}

async function getSellerName() {
    const { data, error } = await supabase.auth.getSession();
    if (data.session != null) {
        console.log("Session:", data.session.user.id);
        return data.session.user.user_metadata.display_name;
    } else console.log("No session found");
}

export async function getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (data.session != null) {
        console.log("Session:", data.session.user.id);
        return data.session.user.id;
    } else console.log("No session found");
}

export async function getuserType() {
    const { data, error } = await supabase.auth.getSession();
    if (data.session != null) {
        console.log("Session:", data.session.user.id);
        console.log(data.session.user.user_metadata);
        return data.session.user.user_metadata.type;
    } else console.log("No session found");
}

export async function signUpNewUser(email, password, username, file) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                display_name: username,
                type: "Customer",
            },
        },
    });
    if (error) {
        if (error.message == "Anonymous sign-ins are disabled") return "Fill out all fields!";
        else return error.message;
    } else {
        const userId = await getSession();
        await uploadKisanCard(file, userId);
        return await createUserRow(userId);
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
        return "Account created successfully";
    }
}

async function uploadKisanCard(file, userID) {
    console.log(file, "Hi")
    const { data, error } = await supabase.storage
        .from("kisancard")
        .upload(`${userID}/KisanCard.png`, file, { "content-type": "image/png" });
    if (error) {
        console.log(error);
    } else {
        return data;
    }
}

export async function fetcharray(UserID) {
    let { data: users, error } = await supabase
        .from("users")
        .select("cart")
        .eq("userID", UserID)
        .single();
    console.log("Fetching cart array for user: ", users);
    return users;
}

export async function addToCart(cartData) {
    const UserID = await getSession();
    if (UserID == null) {
        return "No user logged in";
    }
    const fetchedArray = await fetcharray(UserID);
    fetchedArray.cart.push(cartData);
    const cart = sortCart(fetchedArray.cart);
    console.log("sorted cart is", cart);
    const { data, error } = await supabase
        .from("users")
        .update({ cart: cart })
        .eq("userID", UserID)
        .select();
    if (error) {
        console.log(error);
    } else return "Item added to cart!";
}

export async function loginUser(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });
    if (error) {
        return error.message;
    } else {
        getSession();
        return "User logged in successfully";
    }
}

export async function fetchCartDetails(id) {
    const { data, error } = await supabase
        .from("items")
        .select("name, price, availableIn, url, id")
        .in("id", id);
    if (error) console.log(error);
    else return data;
}

export async function fetchID() {
    const UserID = await getSession();
    const { data, error } = await supabase
        .from("users")
        .select("cartID")
        .eq("userID", UserID)
        .single();
    if (error) console.log(error);
    else {
        return data.cartID;
    }
}

export async function fetchCart() {
    const UserID = await getSession();
    const { data, error } = await supabase
        .from("users")
        .select("cart")
        .eq("userID", UserID)
        .single();
    if (error) console.log(error);
    else {
        return data.cart;
    }
}

export async function updateCart(cart) {
    const UserID = await getSession();
    const { data, error } = await supabase
        .from("users")
        .update({ cart: cart })
        .eq("userID", UserID)
        .select();
    if (error) {
        console.log(error);
    }
    return "Cart Updated";
}

export async function signUpNewSeller(email, password, username) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                display_name: username,
                type: "Seller",
            },
        },
    });
    if (error) {
        if (error.message == "Anonymous sign-ins are disabled") return "Fill out all fields!";
        else return error.message;
    } else {
        const userId = await getSession();
        console.log(data);
        return await createSellerRow(
            userId,
            data.user.user_metadata.display_name
        );
    }
}


async function createSellerRow(userID, userName) {
    const { data, error } = await supabase
        .from("seller")
        .insert([{ userID: userID, sellerName: userName }])
        .select();
    if (error) {
        return error.message;
    } else {
        return "Seller account created successfully";
    }
}

async function signOutUser() {
    const { error } = await supabase.auth.signOut();
    if (error) alert("Error signing out:", error.message);
    else {
        console.log("Successfully signed out!");
        getSession();
    }
}

export async function loginSeller(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });
    if (error) {
        return error.message;
    } else {
        if (data.user.user_metadata.type === "Seller") {
            return "Seller logged in successfully";
            console.log(data);
        } else {
            console.log("Not a seller account");
            signOutUser();
            return "Not A seller account";
        }
    }
    getSession();
}
///// BE SURE TO REPLACE fetchCart and fetchArray..... (Pending)
