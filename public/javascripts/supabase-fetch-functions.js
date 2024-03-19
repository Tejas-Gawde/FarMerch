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
    if (error) {
        console.log(error)
    }
    else {
        console.log("got single data");
        return items[0]
    }
}