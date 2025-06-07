import supabase from "../utils/supabase/client";

// temp function to understand supabase functionality
export async function authUser() {
  await supabase.from("sometable").select("*");
}
