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