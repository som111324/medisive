import React, { createContext, useContext, useState, useEffect } from "react";
import { User, AuthState } from "../types/auth";
import supabase from "../utils/supabase/client";
import { getUserById } from "../db/users";

interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<void>;
    signup: (
        name: string,
        email: string,
        phone: string,
        password: string,
    ) => Promise<void>;
    logout: () => void;
    setAuthState: (value: AuthState) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: true,
    });

    useEffect(() => {
        // Check if user is stored in localStorage
        // const storedUser = localStorage.getItem("medscribe_user");
        async function initialUseEffect() {
            const storedUser = await supabase.auth.getSession();
            if (storedUser) {
                try {
                    // const user = JSON.parse(storedUser);
                    const { success, data } = await getUserById(
                        storedUser.data.session?.user.id!,
                    );

                    if (!success || !data) {
                        alert("Something went wrong");
                        setAuthState({
                            user: null,
                            isAuthenticated: false,
                            isLoading: false,
                        });
                        return;
                    }

                    if (data.length === 0) {
                        setAuthState({
                            user: null,
                            isAuthenticated: false,
                            isLoading: false,
                        });
                        return;
                    }

                    setAuthState({
                        user: data[0],
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } catch (error) {
                    console.error("Failed to parse stored user:", error);
                    // localStorage.removeItem("medscribe_user");
                    setAuthState({
                        user: null,
                        isAuthenticated: false,
                        isLoading: false,
                    });
                }
            } else {
                setAuthState({
                    user: null,
                    isAuthenticated: false,
                    isLoading: false,
                });
            }
        }
        initialUseEffect();
    }, []);

    const login = async (email: string, password: string) => {
        // Simulate API call
        setAuthState((prev) => ({ ...prev, isLoading: true }));

        // This is a mock implementation
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                // For demo purposes, any credentials will work
                const mockUser: User = {
                    id: "usr_" + Math.random().toString(36).substring(2, 9),
                    name: email.split("@")[0], // Extract name from email
                    email,
                    phone: "9876543210", // Mock phone number
                };

                localStorage.setItem(
                    "medscribe_user",
                    JSON.stringify(mockUser),
                );

                setAuthState({
                    user: mockUser,
                    isAuthenticated: true,
                    isLoading: false,
                });

                resolve();
            }, 1000);
        });
    };

    const signup = async (
        name: string,
        email: string,
        phone: string,
        password: string,
    ) => {
        // Simulate API call
        setAuthState((prev) => ({ ...prev, isLoading: true }));

        // This is a mock implementation
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                const mockUser: User = {
                    id: "usr_" + Math.random().toString(36).substring(2, 9),
                    name,
                    email,
                    phone,
                };

                localStorage.setItem(
                    "medscribe_user",
                    JSON.stringify(mockUser),
                );

                setAuthState({
                    user: mockUser,
                    isAuthenticated: true,
                    isLoading: false,
                });

                resolve();
            }, 1000);
        });
    };

    const logout = () => {
        localStorage.removeItem("medscribe_user");
        setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
        });
    };

    return (
        <AuthContext.Provider
            value={{
                ...authState,
                setAuthState,
                login,
                signup,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
