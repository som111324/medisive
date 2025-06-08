import supabase from "../utils/supabase/client";

// temp function to understand supabase functionality
export async function authLogin() {
    await supabase.from("sometable").select("*");
}

export async function authSignup() {}

export async function authLogout() {}
