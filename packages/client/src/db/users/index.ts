import supabase from "../../utils/supabase/client";

export async function getUser(email: string) {
    try {
        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", email);
        if (error) {
            console.log("error from supabase in getUser", error);
            return {
                success: false,
            };
        }

        return {
            success: true,
            data: data,
        };
    } catch (error) {
        console.log("error in catch in getUser", error);
        return {
            success: false,
        };
    }
}

export async function createUser(newUser: any, role: string) {
    try {
        console.log("newUser in createUser", newUser, role);
        const { data, error } = await supabase
            .from("users")
            .insert({
                full_name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
                age: newUser.age,
                gender: newUser.gender,
                date_of_birth: newUser.dateOfBirth,
                blood_type: newUser.bloodGroup,
                role: role,
            })
            .select();
        if (error) {
            console.log("error from supabase in getUser", error);
            return {
                success: false,
            };
        }

        console.log("data in createUser", data);

        return {
            success: true,
            data: data,
        };
    } catch (error) {
        console.log("error in catch in getUser", error);
        return {
            success: false,
        };
    }
}

export async function getUserById(id: string) {
    try {
        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", id);
        if (error) {
            console.log("error from supabase in getUserById", error);
            return {
                success: false,
            };
        }

        return {
            success: true,
            data: data,
        };
    } catch (error) {
        console.log("error in catch in getUserById", error);
        return {
            success: false,
        };
    }
}
