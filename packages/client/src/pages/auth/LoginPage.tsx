import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, ArrowRight } from "lucide-react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card, {
    CardContent,
    CardFooter,
    CardHeader,
} from "../../components/ui/Card";
// import { useAuth } from "../../contexts/AuthContext";
import Navbar from "../../components/layout/Navbar";
import { sendOtp } from "../../db/auth/index.ts";
import OTPForm from "../../components/ui/auth/OtpForm.tsx";
import { getUser } from "../../db/users/index.ts";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>(
        {},
    );
    // const { login, isLoading } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        const newErrors: { email?: string; password?: string } = {};
        let isValid = true;

        if (!email) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is invalid";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                setIsLoading(true);
                // check if user is already signed in
                const { success: getUserSuccess, data } = await getUser(email);
                console.log("getUser data", data);
                if (!getUserSuccess || !data) {
                    alert("Something went wrong. Please try again.");
                    return;
                }

                // if no user found, send to signup page
                if (data.length === 0) {
                    navigate("/auth/signup");
                    return;
                }

                // if user found, then send otp
                const { success } = await sendOtp(email);
                if (!success) {
                    alert("Something went wrong. Please try again later.");
                    return;
                }

                console.log("OTP send successfully");
                setShowOtpInput(true);
            } catch (error) {
                console.error("Login failed:", error);
                // Handle login error
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-secondary-50">
            <Navbar />

            {showOtpInput ? (
                <>
                    <OTPForm email={email} setShowOtpInput={setShowOtpInput} />
                </>
            ) : (
                <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md">
                        <Card>
                            <CardHeader>
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold text-secondary-900">
                                        Sign in to your account
                                    </h2>
                                    <p className="mt-2 text-sm text-secondary-600">
                                        Or{" "}
                                        <Link
                                            to="/auth/signup"
                                            className="font-medium text-primary-600 hover:text-primary-500"
                                        >
                                            create a new account
                                        </Link>
                                    </p>
                                </div>
                            </CardHeader>

                            <CardContent>
                                <form
                                    className="space-y-2"
                                    onSubmit={handleSubmit}
                                >
                                    <Input
                                        label="Email Address"
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="doctor@example.com"
                                        leftIcon={<Mail size={18} />}
                                        error={errors.email}
                                        fullWidth
                                        required
                                    />

                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size="lg"
                                        fullWidth
                                        isLoading={isLoading}
                                        rightIcon={<ArrowRight size={16} />}
                                    >
                                        Sign in
                                    </Button>
                                </form>
                            </CardContent>

                            <CardFooter>
                                <p className="text-center text-xs text-secondary-500">
                                    By signing in, you agree to our{" "}
                                    <a
                                        href="#"
                                        className="text-primary-600 hover:text-primary-500"
                                    >
                                        Terms of Service
                                    </a>{" "}
                                    and{" "}
                                    <a
                                        href="#"
                                        className="text-primary-600 hover:text-primary-500"
                                    >
                                        Privacy Policy
                                    </a>
                                </p>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginPage;

