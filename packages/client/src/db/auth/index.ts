import supabase from "../../utils/supabase/client";

export const sendOtp = async (email: string) => {
    try {
        const { error } = await supabase.auth.signInWithOtp({
            email: email,
            options: {
                // set this to false if you do not want the user to be automatically signed up
                shouldCreateUser: true,
                // emailRedirectTo: process.env.NEXT_PUBLIC_URL, // this will be remove is future, when magic link is removed
            },
        });

        if (error) {
            console.log("Server: OTP: ", error.message);
            return {
                success: false,
                message: error.message,
            };
        }

        return {
            success: true,
            message: "OTP sent succesfully",
        };
    } catch (error) {
        return {
            success: "false",
            message: "Something went wrong.",
        };
    }
};

export const verifyOtp = async (email: string, otp: string) => {
    try {
        console.log("email in verifyOtp", email);

        const { data, error } = await supabase.auth.verifyOtp({
            email: email,
            token: otp,
            type: "email",
        });

        if (error) {
            console.log("Server: OTP verification: ", error.message);
            return {
                success: false,
                message: error.message,
                data: null,
            };
        }

        return {
            success: true,
            message: "OTP verified",
            data: data,
        };
    } catch (error) {
        console.log(
            `Error in catch while verifying otp : ${JSON.stringify(error)}`,
        );
        return {
            success: "false",
            message: "Something went wrong.",
        };
    }
};

export const signOut = async () => {
    try {
        const { error } = await supabase.auth.signOut({ scope: "local" });
        if (error) {
            console.log(`Error logging out ${JSON.stringify(error)}`, "error");
        }
        console.log("User signed out", "info");
    } catch (error) {
        console.log(
            `Error in catch in logging out ${JSON.stringify(error)}`,
            "error",
        );
    }
};
