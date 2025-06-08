import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Heart } from "lucide-react";
import Button from "../ui/Button";
import { useAuth } from "../../contexts/AuthContext";
import supabase from "../../utils/supabase/client";

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated, setAuthState } = useAuth();
    const location = useLocation();
    const isLandingPage = location.pathname === "/";

    async function handleLogout() {
        console.log("Logging user out");
        const { error } = await supabase.auth.signOut();
        if (error) {
            alert("Something went wrong. Please try again.");
            return;
        }

        setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
        });
    }

    return (
        <header
            className={`sticky top-0 z-50 w-full ${isLandingPage ? "bg-transparent" : "bg-white shadow-sm"}`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <Heart className="h-8 w-8 text-primary-600" />
                            <span className="ml-2 text-xl font-bold text-secondary-900">
                                MedScribe AI
                            </span>
                        </Link>
                    </div>

                    <nav className="hidden md:flex space-x-10">
                        <Link
                            to="/"
                            className="text-secondary-600 hover:text-primary-600 font-medium"
                        >
                            Home
                        </Link>
                        <a
                            href="#how-it-works"
                            className="text-secondary-600 hover:text-primary-600 font-medium"
                        >
                            How It Works
                        </a>
                        <a
                            href="#why-needed"
                            className="text-secondary-600 hover:text-primary-600 font-medium"
                        >
                            Why It's Needed
                        </a>
                    </nav>

                    <div className="hidden md:flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <Link to="/dashboard">
                                    <Button variant="secondary">
                                        Dashboard
                                    </Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to="/auth/login">
                                    <Button variant="outline">Login</Button>
                                </Link>
                                <Link to="/auth/signup">
                                    <Button variant="primary">Signup</Button>
                                </Link>
                            </>
                        )}
                    </div>

                    <div className="md:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md p-2 text-secondary-400 hover:bg-secondary-100 hover:text-secondary-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <X
                                    className="block h-6 w-6"
                                    aria-hidden="true"
                                />
                            ) : (
                                <Menu
                                    className="block h-6 w-6"
                                    aria-hidden="true"
                                />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-secondary-100">
                    <div className="space-y-1 px-2 py-3 sm:px-3">
                        <Link
                            to="/"
                            className="block rounded-md px-3 py-2 text-base font-medium text-secondary-900 hover:bg-secondary-100"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <a
                            href="#how-it-works"
                            className="block rounded-md px-3 py-2 text-base font-medium text-secondary-900 hover:bg-secondary-100"
                            onClick={() => setIsOpen(false)}
                        >
                            How It Works
                        </a>
                        <a
                            href="#why-needed"
                            className="block rounded-md px-3 py-2 text-base font-medium text-secondary-900 hover:bg-secondary-100"
                            onClick={() => setIsOpen(false)}
                        >
                            Why It's Needed
                        </a>
                    </div>
                    <div className="border-t border-secondary-200 pb-3 pt-4">
                        <div className="flex flex-col space-y-2 px-4">
                            {isAuthenticated ? (
                                <>
                                    <Link
                                        to="/dashboard"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <Button variant="secondary" fullWidth>
                                            Dashboard
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="outline"
                                        fullWidth
                                        onClick={() => {
                                            handleLogout();
                                            setIsOpen(false);
                                        }}
                                    >
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/auth/login"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <Button variant="outline" fullWidth>
                                            Login
                                        </Button>
                                    </Link>
                                    <Link
                                        to="/auth/signup"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <Button variant="primary" fullWidth>
                                            Signup
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
