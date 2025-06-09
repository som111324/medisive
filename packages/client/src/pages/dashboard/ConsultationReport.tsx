import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import {
    Clipboard,
    Calendar,
    Download,
    Eye,
    EyeOff,
    FileText,
    Share2,
    Stethoscope,
    User,
    Heart,
    Clock,
    Phone,
} from "lucide-react";
import Card, { CardContent, CardHeader } from "../../components/ui/Card";
import Badge from "../../components/Badge";
import Section from "../../components/Section";
import Navbar from "../../components/layout/Navbar";
import { Consultation } from "../../types/consultation";
import { getConsultation } from "../../db/consultations";
import ErrorComponent from "../../components/ErrorComponent";

// Sample consultation data
// const consultationData = {
//     id: "CONS-2024-001",
//     date: "2024-06-09",
//     time: "14:30",
//     summary:
//         "Patient presented with chronic headaches and fatigue. Physical examination revealed normal vital signs. Recommended lifestyle modifications and prescribed mild analgesics for symptom management.",
//     transcription:
//         "Patient: I have been experiencing severe headaches for the past 2 weeks, along with constant fatigue. Doctor: Can you describe the nature of these headaches? Are they throbbing or constant? Patient: They are mostly throbbing and occur mainly in the morning. Doctor: Any recent changes in your sleep pattern or stress levels? Patient: Yes, I have been working late nights and getting only 4-5 hours of sleep. Doctor: Based on your symptoms and examination, this appears to be tension-type headaches related to sleep deprivation and stress...",
//     symptoms: [
//         "Chronic headaches",
//         "Fatigue",
//         "Sleep disturbances",
//         "Mild nausea",
//     ],
//     treatment:
//         "Prescribed Paracetamol 500mg twice daily for 5 days. Recommended 7-8 hours of sleep daily, stress management techniques, and regular exercise.",
//     followUp:
//         "Follow-up appointment scheduled in 2 weeks. Patient advised to return earlier if symptoms worsen or new symptoms develop.",
//     doctorName: "Dr. Priya Sharma",
//     patientName: "Rahul Verma",
//     chiefComplaint: "Severe headaches and fatigue for 2 weeks",
//     patientAge: 32,
//     bloodGroup: "B+",
//     dateOfBirth: "1992-03-15",
// };

const ConsultationReport: React.FC = () => {
    const navigate = useNavigate();
    const [userType, setUserType] = useState<"doctor" | "patient">("patient");
    const [showSensitiveData, setShowSensitiveData] = useState(false);
    const [consultationData, setConsultationData] =
        useState<Consultation | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { consultationId } = useParams();
    const [showError, setShowError] = useState(false);
    if (!consultationId) {
        navigate("/dashboard");
        return;
    }
    console.log("consultationId", consultationId);

    useEffect(() => {
        async function initialUseEffect() {
            setIsLoading(true);

            const { success, data } = await getConsultation(consultationId!);
            if (!success || !data) {
                alert("Something went wrong, please try again.");
                setShowError(true);
                return;
            }
            console.log(data);

            setConsultationData(data[0]);
            setIsLoading(false);
        }

        initialUseEffect();
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    function formatTime(timestamp: string): string {
        // Parse the timestamp into a Date object
        const date = new Date(timestamp);

        // Extract hours, minutes, and seconds
        const hours = date.getUTCHours().toString().padStart(2, "0");
        const minutes = date.getUTCMinutes().toString().padStart(2, "0");
        const seconds = date.getUTCSeconds().toString().padStart(2, "0");

        // Return formatted time string in HH:MM:SS format
        return `${hours}:${minutes}:${seconds}`;
    }

    const handleDownloadReport = () => {
        console.log("Downloading report...");
        alert("Report downloaded successfully!");
    };

    const handleShareReport = () => {
        console.log("Sharing report...");
        alert("Report shared successfully!");
    };

    if (showError) {
        return <ErrorComponent />;
    }

    if (isLoading || !consultationData) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-secondary-50">
            <Navbar />
            {/* <div className="min-h-screen bg-gray-50 py-8"> */}
            <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Consultation Report
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Report ID:{" "}
                                {`cons_${consultationData.id.split("-")[0]}`}
                            </p>
                        </div>

                        {/* User Type Toggle (for demo purposes) */}
                        <div className="flex items-center space-x-4">
                            <div className="flex rounded-lg bg-gray-200 p-1">
                                <button
                                    onClick={() => setUserType("patient")}
                                    className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                                        userType === "patient"
                                            ? "bg-white text-blue-600 shadow-sm"
                                            : "text-gray-500 hover:text-gray-700"
                                    }`}
                                >
                                    Patient View
                                </button>
                                <button
                                    onClick={() => setUserType("doctor")}
                                    className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                                        userType === "doctor"
                                            ? "bg-white text-blue-600 shadow-sm"
                                            : "text-gray-500 hover:text-gray-700"
                                    }`}
                                >
                                    Doctor View
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                        {/* <Button */}
                        {/*     variant="primary" */}
                        {/*     leftIcon={<Download size={16} />} */}
                        {/*     onClick={handleDownloadReport} */}
                        {/* > */}
                        {/*     Download Report */}
                        {/* </Button> */}
                        <Button
                            variant="primary"
                            leftIcon={<Share2 size={16} />}
                            onClick={handleShareReport}
                        >
                            Share Report
                        </Button>
                        {userType === "doctor" && (
                            <Button
                                variant="outline"
                                leftIcon={
                                    showSensitiveData ? (
                                        <EyeOff size={16} />
                                    ) : (
                                        <Eye size={16} />
                                    )
                                }
                                onClick={() =>
                                    setShowSensitiveData(!showSensitiveData)
                                }
                            >
                                {showSensitiveData ? "Hide" : "Show"} Sensitive
                                Data
                            </Button>
                        )}
                    </div>
                </div>

                {/* Report Content */}
                <div className="space-y-6">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                                <FileText
                                    className="mr-2 text-blue-600"
                                    size={20}
                                />
                                Consultation Overview
                            </h2>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div>
                                    <div className="flex items-center mb-2">
                                        <Calendar
                                            className="text-gray-400 mr-2"
                                            size={16}
                                        />
                                        <span className="text-sm font-medium text-gray-600">
                                            Date & Time
                                        </span>
                                    </div>
                                    <p className="text-gray-900">
                                        {formatDate(
                                            consultationData.created_at,
                                        )}
                                    </p>
                                    <p className="text-gray-600 text-sm">
                                        {formatTime(
                                            consultationData.created_at,
                                        )}
                                    </p>
                                </div>

                                <div>
                                    <div className="flex items-center mb-2">
                                        <Stethoscope
                                            className="text-gray-400 mr-2"
                                            size={16}
                                        />
                                        <span className="text-sm font-medium text-gray-600">
                                            Doctor
                                        </span>
                                    </div>
                                    <p className="text-gray-900">
                                        {consultationData.doctor.full_name}
                                    </p>
                                </div>

                                <div>
                                    <div className="flex items-center mb-2">
                                        <User
                                            className="text-gray-400 mr-2"
                                            size={16}
                                        />
                                        <span className="text-sm font-medium text-gray-600">
                                            Patient
                                        </span>
                                    </div>
                                    <p className="text-gray-900">
                                        {consultationData.patient.full_name}
                                    </p>
                                    <p className="text-gray-600 text-sm">
                                        Age: {consultationData.patient.age}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Patient Information (Doctor view gets more details) */}
                    {userType === "doctor" && (
                        <Card>
                            <CardHeader>
                                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                                    <User
                                        className="mr-2 text-blue-600"
                                        size={20}
                                    />
                                    Patient Information
                                </h2>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <span className="text-sm font-medium text-gray-600">
                                            Date of Birth
                                        </span>
                                        <p className="text-gray-900 mt-1">
                                            {formatDate(
                                                consultationData.patient
                                                    .date_of_birth,
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-600">
                                            Blood Group
                                        </span>
                                        <p className="text-gray-900 mt-1">
                                            <Badge variant="info">
                                                {
                                                    consultationData.patient
                                                        .blood_type
                                                }
                                            </Badge>
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-600">
                                            Age
                                        </span>
                                        <p className="text-gray-900 mt-1">
                                            {consultationData.patient.age} years
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Chief Complaint */}
                    <Section
                        title="Chief Complaint"
                        icon={<Clipboard size={20} />}
                    >
                        <p className="text-gray-800 leading-relaxed">
                            {consultationData.chief_complaint}
                        </p>
                    </Section>

                    {/* Symptoms */}
                    <Section title="Symptoms" icon={<Heart size={20} />}>
                        {/* <div className="flex flex-wrap gap-2"> */}
                        {/*     {consultationData.symptoms.map((symptom, index) => ( */}
                        {/*         <Badge key={index} variant="warning"> */}
                        {/*             {symptom} */}
                        {/*         </Badge> */}
                        {/*     ))} */}
                        {/* </div> */}
                        <p className="text-gray-800 leading-relaxed">
                            {consultationData.symptoms}
                        </p>
                    </Section>

                    {/* Summary */}
                    <Section
                        title="Consultation Summary"
                        icon={<FileText size={20} />}
                    >
                        <p className="text-gray-800 leading-relaxed">
                            {consultationData.summary}
                        </p>
                    </Section>

                    {/* Treatment Plan */}
                    <Section
                        title="Treatment Plan"
                        icon={<Stethoscope size={20} />}
                    >
                        <p className="text-gray-800 leading-relaxed">
                            {consultationData.treatment}
                        </p>
                    </Section>

                    {/* Follow-up */}
                    <Section
                        title="Follow-up Instructions"
                        icon={<Clock size={20} />}
                    >
                        <p className="text-gray-800 leading-relaxed">
                            {consultationData.follow_up}
                        </p>
                    </Section>

                    {/* Transcription (Doctor view only) */}
                    {userType === "doctor" && (
                        <Card>
                            <CardHeader>
                                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                                    <FileText
                                        className="mr-2 text-blue-600"
                                        size={20}
                                    />
                                    Consultation Transcription
                                    <Badge variant="info" className="ml-2">
                                        Doctor Only
                                    </Badge>
                                </h2>
                            </CardHeader>
                            <CardContent>
                                <div
                                    className={`bg-gray-100 rounded-lg p-4 ${!showSensitiveData ? "filter blur-sm" : ""}`}
                                >
                                    <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                                        {consultationData.transcription}
                                    </p>
                                </div>
                                {!showSensitiveData && (
                                    <div className="text-center mt-4">
                                        <p className="text-gray-600 text-sm mb-2">
                                            Click "Show Sensitive Data" to view
                                            transcription
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Contact Information */}
                    <Card className="bg-blue-50 border-blue-200">
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-blue-900">
                                        Need Help?
                                    </h3>
                                    <p className="text-blue-700 text-sm mt-1">
                                        Contact your healthcare provider for any
                                        questions about this report.
                                    </p>
                                </div>
                                <Button
                                    variant="primary"
                                    leftIcon={<Phone size={16} />}
                                    onClick={() =>
                                        alert("Calling healthcare provider...")
                                    }
                                >
                                    Contact Doctor
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Footer */}
                <div className="mt-12 text-center text-gray-500 text-sm">
                    <p>
                        This report is confidential and intended for the patient
                        and authorized healthcare providers only.
                    </p>
                    <p className="mt-1">
                        Generated on {formatDate(consultationData.created_at)}{" "}
                        at {formatTime(consultationData.created_at)}
                    </p>
                </div>
            </div>
            {/* </div> */}
        </div>
    );
};

export default ConsultationReport;
