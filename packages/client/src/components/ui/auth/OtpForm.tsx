import { useEffect, useRef, useState } from "react";
import Card, { CardContent, CardFooter, CardHeader } from "../Card";
import Button from "../Button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { verifyOtp } from "../../../db/auth/index.ts";
import { useNavigate } from "react-router-dom";
import { createUser, getUser } from "../../../db/users/index.ts";
import { useAuth } from "../../../contexts/AuthContext.tsx";

// OTP Input Component
interface OTPInputProps {
    value: string;
    onChange: (value: string) => void;
    length?: number;
    error?: string;
}

const OTPInput: React.FC<OTPInputProps> = ({
    value,
    onChange,
    length = 6,
    error,
}) => {
    const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (value) {
            const otpArray = value.split("").slice(0, length);
            while (otpArray.length < length) {
                otpArray.push("");
            }
            setOtp(otpArray);
        }
    }, [value, length]);

    const handleChange = (index: number, val: string) => {
        if (val.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = val;
        setOtp(newOtp);
        onChange(newOtp.join(""));

        // Auto-focus next input
        if (val && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text").slice(0, length);
        const otpArray = pasteData.split("").slice(0, length);
        while (otpArray.length < length) {
            otpArray.push("");
        }
        setOtp(otpArray);
        onChange(otpArray.join(""));

        // Focus the last filled input or the first empty one
        const lastFilledIndex = Math.min(pasteData.length - 1, length - 1);
        inputRefs.current[lastFilledIndex]?.focus();
    };

    return (
        <div className="space-y-2">
            <div className="flex justify-center space-x-2">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        value={digit}
                        onChange={(e) =>
                            handleChange(
                                index,
                                e.target.value.replace(/\D/g, ""),
                            )
                        }
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        className={`w-12 h-12 text-center text-lg font-semibold border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                            error
                                ? "border-red-300 bg-red-50"
                                : "border-gray-300 bg-white hover:border-gray-400"
                        }`}
                    />
                ))}
            </div>
            {error && (
                <p className="text-sm text-red-600 text-center">{error}</p>
            )}
        </div>
    );
};

// Main OTP Form Component
const OTPForm = ({
    email,
    setShowOtpInput,
    newUser,
    userType,
}: {
    email: string;
    setShowOtpInput: (value: boolean) => void;
    newUser?: Record<string, string>;
    userType?: string;
}) => {
    const { setAuthState } = useAuth();
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [resendTimer, setResendTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);

    // Timer for resend functionality
    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(
                () => setResendTimer(resendTimer - 1),
                1000,
            );
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [resendTimer]);

    const handleSubmit = async () => {
        setError("");

        if (otp.length !== 6) {
            setError("Please enter the complete 6-digit code");
            return;
        }

        setIsLoading(true);

        try {
            const { success } = await verifyOtp(email, otp);
            if (!success) {
                alert("OTP invalid or expired. Try again.");
                return;
            }

            console.log("OTP verified:", otp);

            let currentUser: any;

            const { success: getUserSuccess, data: getUserData } =
                await getUser(email);
            console.log("getUser data", getUserData);
            if (!getUserSuccess || !getUserData) {
                alert("Something went wrong. Please try again.");
                return;
            }

            // check if new user
            if (getUserData.length === 0) {
                // if no user found, create a new user
                const { success, data } = await createUser(
                    newUser,
                    userType ?? "PATIENT",
                );

                if (!success || !data) {
                    alert("Something went wrong. Please try again.");
                    return;
                }

                console.log("data after createUser", data);
                currentUser = data[0];
            } else {
                currentUser = getUserData[0];
            }

            // set the user auth context
            setAuthState({
                user: currentUser,
                isAuthenticated: true,
                isLoading: false,
            });

            navigate("/dashboard");
        } catch (err) {
            console.log("error in catch in handleSubmit", err);
            setError("Invalid verification code. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        if (!canResend) return;

        setCanResend(false);
        setResendTimer(30);
        setError("");

        // Simulate resend API call
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("OTP resent");
        } catch (err) {
            setError("Failed to resend code. Please try again.");
        }
    };

    const handleBack = () => {
        setShowOtpInput(false);
        // Handle navigation back to previous screen
        console.log("Navigate back");
    };

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
                <Card>
                    <CardHeader>
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Verify Your Account
                            </h2>
                            <p className="mt-2 text-sm text-gray-600">
                                We've sent a 6-digit verification code to your
                                email address
                            </p>
                            <p className="mt-1 text-sm font-medium text-blue-600">
                                {email}
                            </p>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                                    Enter verification code
                                </label>
                                <OTPInput
                                    value={otp}
                                    onChange={setOtp}
                                    length={6}
                                    error={error}
                                />
                            </div>

                            <Button
                                type="button"
                                variant="primary"
                                size="lg"
                                fullWidth
                                isLoading={isLoading}
                                rightIcon={<ArrowRight size={16} />}
                                onClick={handleSubmit}
                            >
                                Verify Code
                            </Button>
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Didn't receive the code?{" "}
                                {canResend ? (
                                    <button
                                        onClick={handleResend}
                                        className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline"
                                    >
                                        Resend code
                                    </button>
                                ) : (
                                    <span className="text-gray-400">
                                        Resend in {resendTimer}s
                                    </span>
                                )}
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className="flex justify-between items-center w-full">
                            <Button
                                variant="outline"
                                leftIcon={<ArrowLeft size={16} />}
                                onClick={handleBack}
                            >
                                Back
                            </Button>
                            <p className="text-xs text-gray-500">
                                Code expires in 10 minutes
                            </p>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default OTPForm;
