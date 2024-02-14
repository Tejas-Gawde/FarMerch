import supabase from "./supabaseEsm.js"; 

var cartArray = [];

async function fetcharray(){
    let { data: users, error } = await supabase
    .from('users')
    .select('cartValue')
    .eq('id', 'dc040c37-e063-4132-8554-6adafb86f816')
    .single()
    return users.cartValue;
}
async function addToCart(value){ 
    const fetchedArray = await fetcharray();
    fetchedArray.push(value)
    const { data, error } = await supabase
    .from('users')
    .update({ cartValue: fetchedArray })
    .eq('id', 'dc040c37-e063-4132-8554-6adafb86f816')
    .select()
    if (error){
        alert(error)
    }
    console.log(data)
}
