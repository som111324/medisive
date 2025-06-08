import supabase from "../../utils/supabase/client";

export async function getPatientByEmail(email: string) {
    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .eq("role", "PATIENT");

    if (error) {
        console.log("Error getting patient", error);
        return {
            success: false,
            data: null,
        };
    }

    return {
        success: true,
        data,
    };
}
