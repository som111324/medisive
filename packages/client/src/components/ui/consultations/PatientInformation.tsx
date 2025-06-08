import {
    AlertCircle,
    Calendar,
    FileText,
    Heart,
    Phone,
    Search,
    User,
} from "lucide-react";
import Button from "../Button";
import { useState } from "react";
import { Patient } from "../../../types/patient";
import { getPatientByEmail } from "../../../db/patients";

interface PatientInformationProps {
    name: string;
    email: string;
    setName: (value: string) => void;
    setEmail: (value: string) => void;
    patientData: Patient | null;
    setPatientData: (value: Patient) => void;
}

function PatientInformation({
    name,
    setName,
    email,
    setEmail,
    patientData,
    setPatientData,
}: PatientInformationProps) {
    const [showPatientDetails, setShowPatientDetails] = useState(false);

    const fetchPatientData = async () => {
        // Simulate API call to fetch patient data
        // const mockPatientData = {
        //     id: "20934j09fj20",
        //     full_name: name || "John Doe",
        //     email: email || "john.doe@example.com",
        //     age: 45,
        //     gender: "Male",
        //     phone: "+1 (555) 123-4567",
        //     date_of_birth: "1979-03-15",
        //     blood_type: "O+",
        //     allergies: ["Penicillin", "Shellfish"],
        //     chronic_conditions: ["Hypertension", "Type 2 Diabetes"],
        //     last_visit: "2024-05-22",
        // };

        const { success, data } = await getPatientByEmail(email);
        console.log("getPatientByEmail: ", data);

        if (!success) {
            alert("Something went wrong");
            setShowPatientDetails(false);
            return;
        }

        if (!data || data.length === 0) {
            alert("No patient found");
            setShowPatientDetails(false);
            return;
        }

        setPatientData(data[0]);
        setShowPatientDetails(true);
    };

    return (
        <>
            {/* Patient Information Form */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Patient Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter patient's name"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Email <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter patient's email address"
                                required
                            />
                            <Button
                                variant="outline"
                                onClick={fetchPatientData}
                                leftIcon={<Search size={16} />}
                                disabled={!email}
                                className="whitespace-nowrap"
                            >
                                Get Patient
                            </Button>
                        </div>
                    </div>
                </div>
                {/* Patient Details Panel */}
                <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        showPatientDetails
                            ? "max-h-96 opacity-100 mt-6"
                            : "max-h-0 opacity-0"
                    }`}
                >
                    {patientData && (
                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-md font-semibold text-blue-900 flex items-center">
                                    <User size={18} className="mr-2" />
                                    Patient Details
                                </h4>
                                <button
                                    onClick={() => setShowPatientDetails(false)}
                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                                <div className="space-y-3">
                                    <div className="flex items-start">
                                        <User
                                            size={14}
                                            className="mr-2 mt-0.5 text-blue-600"
                                        />
                                        <div>
                                            <p className="font-medium text-gray-700">
                                                Basic Info
                                            </p>
                                            <p className="text-gray-600">
                                                {patientData.age} years,{" "}
                                                {patientData.gender}
                                            </p>
                                            <p className="text-gray-600">
                                                DOB: {patientData.date_of_birth}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <Phone
                                            size={14}
                                            className="mr-2 mt-0.5 text-blue-600"
                                        />
                                        <div>
                                            <p className="font-medium text-gray-700">
                                                Contact
                                            </p>
                                            <p className="text-gray-600">
                                                {patientData.phone}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-start">
                                        <Heart
                                            size={14}
                                            className="mr-2 mt-0.5 text-blue-600"
                                        />
                                        <div>
                                            <p className="font-medium text-gray-700">
                                                Blood Type
                                            </p>
                                            <p className="text-gray-600">
                                                {patientData.blood_type}
                                            </p>
                                        </div>
                                    </div>

                                    {patientData.allergies && (
                                        <div className="flex items-start">
                                            <AlertCircle
                                                size={14}
                                                className="mr-2 mt-0.5 text-red-500"
                                            />
                                            <div>
                                                <p className="font-medium text-gray-700">
                                                    Allergies
                                                </p>
                                                <p className="text-gray-600">
                                                    {patientData.allergies.join(
                                                        ", ",
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    {patientData.chronic_conditions && (
                                        <div className="flex items-start">
                                            <FileText
                                                size={14}
                                                className="mr-2 mt-0.5 text-blue-600"
                                            />
                                            <div>
                                                <p className="font-medium text-gray-700">
                                                    Chronic Conditions
                                                </p>
                                                <p className="text-gray-600">
                                                    {patientData.chronic_conditions.join(
                                                        ", ",
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {patientData.last_visit && (
                                        <div className="flex items-start">
                                            <Calendar
                                                size={14}
                                                className="mr-2 mt-0.5 text-blue-600"
                                            />
                                            <div>
                                                <p className="font-medium text-gray-700">
                                                    Last Visit
                                                </p>
                                                <p className="text-gray-600">
                                                    {patientData.last_visit}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default PatientInformation;
