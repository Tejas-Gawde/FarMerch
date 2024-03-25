import { supabase } from "./supabaseEsm.js";

export async function signOutUser() {
    const { error } = await supabase.auth.signOut();
    if (error) alert('Error signing out:', error.message);
    else {
        alert('Successfully signed out!');
        getSession();
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