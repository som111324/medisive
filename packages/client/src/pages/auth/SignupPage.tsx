import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    User,
    Mail,
    Phone,
    ArrowRight,
    UserCircle,
    Stethoscope,
    Calendar,
    Heart,
    Clock,
    GraduationCap,
} from "lucide-react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card, { CardContent, CardHeader } from "../../components/ui/Card";
// import { useAuth } from '../../contexts/AuthContext';
import Navbar from "../../components/layout/Navbar";
import { sendOtp } from "../../db/auth/index.ts";
import { getUser } from "../../db/users/index.ts";
import Select from "../../components/Select.tsx";
import {
    bloodGroupOptions,
    genderOptions,
    specializationOptions,
} from "../../constants/index.ts";
// import Textarea from "../../components/Textarea.tsx";
import OTPForm from "../../components/ui/auth/OtpForm.tsx";

const SignupPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [userType, setUserType] = useState<"DOCTOR" | "PATIENT">("PATIENT");

    // Common fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [newUser, setNewUser] = useState<Record<string, string>>({});

    // Patient-specific fields
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    // const [allergies, setAllergies] = useState("");
    // const [chronicConditions, setChronicConditions] = useState("");

    // Doctor-specific fields
    const [mcrnNumber, setMcrnNumber] = useState("");
    const [yearsOfExperience, setYearsOfExperience] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [medicalSchool, setMedicalSchool] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        // Basic validation
        const newErrors: Record<string, string> = {};

        if (!name) newErrors.name = "Full name is required";
        if (!email) newErrors.email = "Email is required";
        if (!phone) newErrors.phone = "Phone number is required";
        if (!age) newErrors.age = "Age is required";
        if (!gender) newErrors.gender = "Gender is required";
        if (!termsAccepted) newErrors.terms = "You must accept the terms";

        if (userType === "PATIENT") {
            if (!dateOfBirth)
                newErrors.dateOfBirth = "Date of birth is required";
            if (!bloodGroup) newErrors.bloodGroup = "Blood group is required";
        } else {
            if (!mcrnNumber) newErrors.mcrnNumber = "MCRN number is required";
            if (!yearsOfExperience)
                newErrors.yearsOfExperience = "Years of experience is required";
            if (!specialization)
                newErrors.specialization = "Specialization is required";
            if (!medicalSchool)
                newErrors.medicalSchool = "Medical school is required";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // if (validateForm()) {
        try {
            const newUserObj = {
                name,
                email,
                age,
                bloodGroup,
                gender,
                phone,
                dateOfBirth,
            };

            console.log(newUserObj);
            console.log("userType", userType);
            setNewUser(newUserObj);

            // check if user is already signed in
            const { success: getUserSuccess, data } = await getUser(email);
            console.log("getUser data", data);
            if (!getUserSuccess || !data) {
                alert("Something went wrong. Please try again.");
                return;
            }

            // if user found, raise an alert
            if (data.length !== 0) {
                alert("Email already registered. Try a different email.");
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
            console.error("Signup failed:", error);
            // Handle signup error
        }
        // }
    };

    return (
        <div className="min-h-screen bg-secondary-50">
            <Navbar />

            {showOtpInput ? (
                <>
                    <OTPForm
                        email={email}
                        setShowOtpInput={setShowOtpInput}
                        newUser={newUser}
                        userType={userType}
                    />
                </>
            ) : (
                <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                    <div className="w-full max-w-lg">
                        <Card>
                            <CardHeader>
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Create your account
                                    </h2>
                                    <p className="mt-2 text-sm text-gray-600">
                                        Already have an account?{" "}
                                        <a
                                            href="#"
                                            className="font-medium text-blue-600 hover:text-blue-500"
                                        >
                                            Sign in
                                        </a>
                                    </p>
                                </div>

                                {/* Tab Selector */}
                                <div className="mt-6">
                                    <div className="flex rounded-lg bg-gray-100 p-1">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setUserType("PATIENT")
                                            }
                                            className={`flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                                                userType === "PATIENT"
                                                    ? "bg-white text-blue-600 shadow-sm"
                                                    : "text-gray-500 hover:text-gray-700"
                                            }`}
                                        >
                                            <UserCircle
                                                size={16}
                                                className="mr-2"
                                            />
                                            Patient
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setUserType("DOCTOR")
                                            }
                                            className={`flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                                                userType === "DOCTOR"
                                                    ? "bg-white text-blue-600 shadow-sm"
                                                    : "text-gray-500 hover:text-gray-700"
                                            }`}
                                        >
                                            <Stethoscope
                                                size={16}
                                                className="mr-2"
                                            />
                                            Doctor
                                        </button>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent>
                                <div className="space-y-4">
                                    {/* Common Fields */}
                                    <Input
                                        label="Full Name"
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        placeholder={
                                            userType === "DOCTOR"
                                                ? "Dr. Rajesh Kumar"
                                                : "Rajesh Kumar"
                                        }
                                        leftIcon={<User size={18} />}
                                        error={errors.name}
                                        fullWidth
                                        required
                                    />

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

                                    <Input
                                        label="Phone Number"
                                        type="tel"
                                        id="phone"
                                        value={phone}
                                        onChange={(e) =>
                                            setPhone(e.target.value)
                                        }
                                        placeholder="9876543210"
                                        leftIcon={<Phone size={18} />}
                                        error={errors.phone}
                                        fullWidth
                                        required
                                    />

                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            label="Age"
                                            type="number"
                                            id="age"
                                            value={age}
                                            onChange={(e) =>
                                                setAge(e.target.value)
                                            }
                                            placeholder="25"
                                            error={errors.age}
                                            fullWidth
                                            required
                                        />

                                        <Select
                                            label="Gender"
                                            id="gender"
                                            value={gender}
                                            onChange={(e) =>
                                                setGender(e.target.value)
                                            }
                                            options={genderOptions}
                                            error={errors.gender}
                                            fullWidth
                                            required
                                        />
                                    </div>

                                    {/* Patient-specific fields */}
                                    {userType === "PATIENT" && (
                                        <>
                                            <Input
                                                label="Date of Birth"
                                                type="date"
                                                id="dateOfBirth"
                                                value={dateOfBirth}
                                                onChange={(e) =>
                                                    setDateOfBirth(
                                                        e.target.value,
                                                    )
                                                }
                                                leftIcon={
                                                    <Calendar size={18} />
                                                }
                                                error={errors.dateOfBirth}
                                                fullWidth
                                                required
                                            />

                                            <Select
                                                label="Blood Group"
                                                id="bloodGroup"
                                                value={bloodGroup}
                                                onChange={(e) =>
                                                    setBloodGroup(
                                                        e.target.value,
                                                    )
                                                }
                                                options={bloodGroupOptions}
                                                leftIcon={<Heart size={18} />}
                                                error={errors.bloodGroup}
                                                fullWidth
                                                required
                                            />

                                            {/* <Textarea */}
                                            {/*     label="Allergies" */}
                                            {/*     id="allergies" */}
                                            {/*     value={allergies} */}
                                            {/*     onChange={(e) => */}
                                            {/*         setAllergies(e.target.value) */}
                                            {/*     } */}
                                            {/*     placeholder="List any known allergies (optional)" */}
                                            {/*     fullWidth */}
                                            {/* /> */}
                                            {/**/}
                                            {/* <Textarea */}
                                            {/*     label="Chronic Conditions" */}
                                            {/*     id="chronicConditions" */}
                                            {/*     value={chronicConditions} */}
                                            {/*     onChange={(e) => */}
                                            {/*         setChronicConditions( */}
                                            {/*             e.target.value, */}
                                            {/*         ) */}
                                            {/*     } */}
                                            {/*     placeholder="List any chronic medical conditions (optional)" */}
                                            {/*     fullWidth */}
                                            {/* /> */}
                                        </>
                                    )}

                                    {/* Doctor-specific fields */}
                                    {userType === "DOCTOR" && (
                                        <>
                                            <Input
                                                label="MCRN Number"
                                                type="text"
                                                id="mcrnNumber"
                                                value={mcrnNumber}
                                                onChange={(e) =>
                                                    setMcrnNumber(
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Medical Council Registration Number"
                                                error={errors.mcrnNumber}
                                                fullWidth
                                                required
                                            />

                                            <div className="grid grid-cols-2 gap-4">
                                                <Input
                                                    label="Years of Experience"
                                                    type="number"
                                                    id="yearsOfExperience"
                                                    value={yearsOfExperience}
                                                    onChange={(e) =>
                                                        setYearsOfExperience(
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="5"
                                                    leftIcon={
                                                        <Clock size={18} />
                                                    }
                                                    error={
                                                        errors.yearsOfExperience
                                                    }
                                                    fullWidth
                                                    required
                                                />

                                                <Select
                                                    label="Specialization"
                                                    id="specialization"
                                                    value={specialization}
                                                    onChange={(e) =>
                                                        setSpecialization(
                                                            e.target.value,
                                                        )
                                                    }
                                                    options={
                                                        specializationOptions
                                                    }
                                                    leftIcon={
                                                        <Stethoscope
                                                            size={18}
                                                        />
                                                    }
                                                    error={
                                                        errors.specialization
                                                    }
                                                    fullWidth
                                                    required
                                                />
                                            </div>

                                            <Input
                                                label="Medical School"
                                                type="text"
                                                id="medicalSchool"
                                                value={medicalSchool}
                                                onChange={(e) =>
                                                    setMedicalSchool(
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Name of your medical school"
                                                leftIcon={
                                                    <GraduationCap size={18} />
                                                }
                                                error={errors.medicalSchool}
                                                fullWidth
                                                required
                                            />
                                        </>
                                    )}

                                    {/* Terms and Conditions */}
                                    <div className="flex items-start">
                                        <input
                                            id="terms"
                                            name="terms"
                                            type="checkbox"
                                            checked={termsAccepted}
                                            onChange={(e) =>
                                                setTermsAccepted(
                                                    e.target.checked,
                                                )
                                            }
                                            className="h-4 w-4 mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            required
                                        />
                                        <label
                                            htmlFor="terms"
                                            className="ml-2 block text-sm text-gray-700"
                                        >
                                            I agree to the{" "}
                                            <a
                                                href="#"
                                                className="font-medium text-blue-600 hover:text-blue-500"
                                            >
                                                Terms of Service
                                            </a>{" "}
                                            and{" "}
                                            <a
                                                href="#"
                                                className="font-medium text-blue-600 hover:text-blue-500"
                                            >
                                                Privacy Policy
                                            </a>
                                        </label>
                                    </div>
                                    {errors.terms && (
                                        <p className="text-sm text-red-600">
                                            {errors.terms}
                                        </p>
                                    )}

                                    <Button
                                        type="button"
                                        variant="primary"
                                        size="lg"
                                        fullWidth
                                        isLoading={isLoading}
                                        rightIcon={<ArrowRight size={16} />}
                                        onClick={handleSubmit}
                                    >
                                        Create Account
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SignupPage;

