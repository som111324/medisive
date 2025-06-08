import React, { useState, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";
import { User, Plus } from "lucide-react";
import Button from "../../components/ui/Button";
import Card, { CardContent, CardHeader } from "../../components/ui/Card";
import VoiceRecorder from "./VoiceRecorder";
import ConsultationItem from "./ConsultationItem";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "../../components/layout/Navbar";
import { Consultation } from "../../types/consultation";
import {
    createConsultation,
    getAllConsultationsByDoctor,
    getAllConsultationsByPatient,
} from "../../db/consultations";
import { Patient } from "../../types/patient";

const DashboardPage: React.FC = () => {
    const { user } = useAuth();
    const [showRecorder, setShowRecorder] = useState(false);
    const [consultations, setConsultations] = useState<Consultation[]>([]);
    const [patientData, setPatientData] = useState<Patient | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // TODO: add loading
        // TODO: add a form for entering patient inforamtion if new patient found
        async function initialUseEffect() {
            setIsLoading(true);

            // 1. check the role of user
            // 2. if doctor, get consultations and show doctor dashboard
            const { success, data } =
                user.role === "DOCTOR"
                    ? await getAllConsultationsByDoctor(user.id)
                    : await getAllConsultationsByPatient(user.id);

            console.log(data);

            if (!success || !data) {
                alert("Something went wrong. Please try again.");
                return;
            }

            setConsultations(data);
            setIsLoading(false);

            // 3. if patient, get consultations and show patient dashboard
        }

        initialUseEffect();
    }, []);

    const handleSaveConsultation = async (transcription: string[]) => {
        // 1. call the api to generate summary for the transaction
        // const ai = new GoogleGenAI({
        //     apiKey: import.meta.env.VITE_GEMINI_API_KEY,
        // });
        // console.log("transcription", transcription);
        //
        // const response = await ai.models.generateContent({
        //     model: "gemini-2.0-flash-lite",
        //     contents: `Given a transcription of a conversation between doctor and patient in the form of array of strings, generate a report, with output in the form of json only with fields - chief_complaint, summary, treatment, symptoms and follow_up. If no information is provided for a certain point, provide an empty string for it. Transcription - ${transcription}`,
        // });
        //
        // console.log("response", response);
        //
        // if (!response.text) {
        //     alert("Something went wrong. Please try again.");
        //     return;
        // }

        // clean the response
        // const cleanedJsonString = response.text.replace(
        //     /^```json\n|\n```$/g,
        //     "",
        // );
        // const jsonString = response.text
        //     .replace(/^```json\n/, "")
        //     .replace(/\n```$/, "");
        // const parsedJson = JSON.parse(jsonString);
        // console.log("parasedJson", parsedJson);

        const parsedJson = {
            chief_complaint: "Tiredness and persistent cough",
            summary:
                "Mr. Sharma presents with a persistent dry cough for two weeks, fatigue for three to four weeks, and slight shortness of breath when walking up the stairs.  He reports no fever or body aches, but a slight headache a few days prior.  His son had a cold last week.  Breathing sounds slightly wheezy.",
            treatment:
                "Drink plenty of fluids, including warm water with honey. Avoid irritants like smoke. Get plenty of rest.  Contact us immediately if the cough worsens significantly or if you develop a fever.",
            symptoms:
                "Persistent dry cough, fatigue, slight shortness of breath when walking up the stairs, feeling of phlegm in the mornings, slight headache (resolved).",
            follow_up:
                "Blood tests (complete blood count, thyroid function, inflammatory markers) in 2-3 days.  Discussion of next steps pending results.",
        };

        // 2. save the consulatation in the db
        const newConsultation = {
            doctor_id: "915b01ee-d594-4d3a-a31c-29a5af1313c5",
            patient_id: patientData?.id,
            transcription: transcription,
            summary: parsedJson.summary,
            chief_complaint: parsedJson.chief_complaint,
            symptoms: parsedJson.symptoms,
            treatment: parsedJson.treatment,
            follow_up: parsedJson.follow_up,
        };

        const { success, data } = await createConsultation(newConsultation);
        console.log("data for createConsultation", data);
        if (!success || !data) {
            alert("Something went wrong. Please try again.");
            return;
        }

        // 3. show the new consultation in all consultations
        setConsultations((prev) => [data[0], ...prev]);
        setShowRecorder(false);
    };

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-secondary-50">
            <Navbar />

            <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-secondary-900 sm:text-3xl">
                            Dashboard
                        </h1>
                        <p className="mt-1 text-sm text-secondary-600">
                            Welcome back, {user?.full_name}
                        </p>
                    </div>

                    {user.role === "DOCTOR" && (
                        <div className="mt-4 sm:mt-0">
                            <Button
                                variant="primary"
                                onClick={() => setShowRecorder((prev) => !prev)}
                                leftIcon={
                                    showRecorder ? (
                                        <User size={16} />
                                    ) : (
                                        <Plus size={16} />
                                    )
                                }
                            >
                                {showRecorder
                                    ? "View Consultations"
                                    : "New Consultation"}
                            </Button>
                        </div>
                    )}
                </div>

                {showRecorder ? (
                    <VoiceRecorder
                        onSave={handleSaveConsultation}
                        patientData={patientData}
                        setPatientData={setPatientData}
                    />
                ) : (
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <h2 className="text-lg font-medium text-secondary-900">
                                    Recent Consultations
                                </h2>
                            </CardHeader>
                            <CardContent>
                                {consultations.length > 0 ? (
                                    <div className="space-y-4">
                                        {consultations.map((consultation) => (
                                            <ConsultationItem
                                                key={consultation.id}
                                                consultation={consultation}
                                                role={user.role}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-6 text-center">
                                        <p className="text-secondary-500">
                                            {user.role === "DOCTOR"
                                                ? "No consultations yet. Start a new one to get started."
                                                : "No consultations yet."}
                                        </p>
                                        {user.role === "DOCTOR" && (
                                            <div className="mt-4">
                                                <Button
                                                    variant="secondary"
                                                    onClick={() =>
                                                        setShowRecorder(true)
                                                    }
                                                    leftIcon={
                                                        <Plus size={16} />
                                                    }
                                                >
                                                    New Consultation
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-medium text-secondary-900">
                                        Total Consultations
                                    </h3>
                                    <p className="mt-2 text-3xl font-bold text-primary-600">
                                        {consultations.length}
                                    </p>
                                    <p className="mt-2 text-sm text-secondary-500">
                                        Across all patients
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-medium text-secondary-900">
                                        Time Saved
                                    </h3>
                                    <p className="mt-2 text-3xl font-bold text-primary-600">
                                        {consultations.length * 15} min
                                    </p>
                                    <p className="mt-2 text-sm text-secondary-500">
                                        Compared to manual documentation
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-medium text-secondary-900">
                                        Latest Update
                                    </h3>
                                    <p className="mt-2 text-base text-secondary-700">
                                        Multilingual support for Tamil and
                                        Telugu added
                                    </p>
                                    <p className="mt-2 text-sm text-secondary-500">
                                        Updated 2 days ago
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </main>

            {/* <Footer /> */}
        </div>
    );
};

export default DashboardPage;

/*
        // Load mock consultations
        // const mockConsultations: Consultation[] = [
        //     {
        //         id: "23oiofij",
        //         doctor: {
        //             full_name: "Amit Sharma",
        //         },
        //         patient: {
        //             id: "dd7e319b-cff6-4242-838a-bbb233082617",
        //             full_name: "Raghav Pandit",
        //             email: "yash@gmail.com",
        //             phone: "9620467709",
        //             blood_type: "O+",
        //             allergies: ["Pineapple", "Orange"],
        //             chronic_conditions: ["Diabetes", "Obesity"],
        //             date_of_birth: "2004-06-29",
        //             last_visit: "2025-05-26",
        //             age: 22,
        //             gender: "Male",
        //         },
        //         created_at: "2025-02-15T10:30:00Z",
        //         transcription: [
        //             "Good morning, Mr. Sharma. What brings you in today?",
        //             "Good morning, Doctor. I've been feeling quite tired lately, more than usual, and I've also had this persistent cough for about two weeks now.",
        //             "I see. Can you describe the cough for me? Is it dry, or are you bringing anything up?",
        //             "It's mostly dry, but sometimes, especially in the mornings, I feel a bit of phlegm. It's not a lot though.",
        //             "Any other symptoms you've noticed? Fever, chills, body aches?",
        //             "No fever, thankfully. I did have a slight headache a few days ago, but that's gone now. No body aches either.",
        //             "Okay. Have you been around anyone who's been sick recently?",
        //             "My son had a bit of a cold last week, but he's fine now. Nothing serious, just a runny nose and a sniffle.",
        //             "And how long have you been feeling this general fatigue?",
        //             "It's been about three weeks, maybe a month. I just feel drained even after a full night's sleep.",
        //             "Are you having any trouble sleeping?",
        //             "Not really. I fall asleep fine, but I wake up feeling like I haven't rested at all.",
        //             "Have there been any changes in your diet or lifestyle recently?",
        //             "Not really. Everything's pretty much the same. I try to eat healthy, and I go for a walk most days.",
        //             "Are you experiencing any shortness of breath, especially when you're active?",
        //             "A little bit, yes. When I walk up the stairs, I find myself a bit more winded than usual.",
        //             "Alright. Let's take a look. I'll listen to your chest and then we'll consider some blood tests.",
        //             "Okay, Doctor.",
        //             "Breathe deeply for me, please. In and out.",
        //             "Is everything alright?",
        //             "Your breathing sounds a little wheezy, Mr. Sharma. Nothing too concerning at this point, but it's good we're looking into it.",
        //             "So, what do you think it could be?",
        //             "It could be a number of things. Given the persistent cough and fatigue, we need to rule out a few possibilities. The blood tests will give us a clearer picture.",
        //             "What kind of blood tests?",
        //             "We'll do a complete blood count, and also check your thyroid function and some inflammatory markers. This will help us understand if there's an underlying infection or another condition causing your symptoms.",
        //             "How long will the results take?",
        //             "You should have them back in about two or three days. Once we get those, we can discuss the next steps.",
        //             "And in the meantime, what should I do about the cough?",
        //             "For now, I'd recommend drinking plenty of fluids, warm water with honey can be soothing. Avoid irritants like smoke, and get plenty of rest. If the cough worsens significantly or you develop a fever, please contact us immediately.",
        //             "Okay, I'll do that. Thank you, Doctor.",
        //             "You're welcome, Mr. Sharma. We'll be in touch once the results are in.",
        //         ],
        //         chief_complaint: "Tiredness and persistent cough for two weeks",
        //         summary:
        //             "Patient reports fatigue for about three weeks, persistent dry cough with occasional phlegm, and slight shortness of breath when walking up the stairs.  Reports a prior cold exposure from his son. No fever or body aches were reported, but patient had a slight headache a few days ago. The doctor will order blood tests (CBC, thyroid function, and inflammatory markers) to rule out potential causes.",
        //         treatment:
        //             "Patient should drink plenty of fluids, warm water with honey, avoid irritants (like smoke), and get plenty of rest.",
        //         symptoms:
        //             "Fatigue, persistent cough (dry with occasional phlegm), slight shortness of breath when walking up the stairs, and a past headache.",
        //         follow_up:
        //             "Patient to return for a follow-up appointment after blood test results are available in 2-3 days. Patient should contact the doctor immediately if the cough worsens significantly or if a fever develops.",
        //     },

            // {
            //     id: "2039u409j",
            //     doctor: {
            //         full_name: "Amit Sharma",
            //     },
            //     patient: {
            //         id: "dd7e319b-cff6-4242-838a-bbb233082222",
            //         full_name: "Subham Nayak",
            //         email: "subham@gmail.com",
            //         phone: "9826110011",
            //         blood_type: "O+",
            //         allergies: ["Dust", "Lemon"],
            //         chronic_conditions: ["Blood Pressure", "Weakness"],
            //         date_of_birth: "2003-03-30",
            //         last_visit: "2025-05-10",
            //         age: 21,
            //         gender: "Male",
            //     },
            //     created_at: "2025-02-11T10:30:00Z",
            //     transcription: [
            //         "Good morning, Mr. Sharma. What brings you in today?",
            //         "Good morning, Doctor. I've been feeling quite tired lately, more than usual, and I've also had this persistent cough for about two weeks now.",
            //     ],
            //     summary:
            //         "Diagnosed with viral upper respiratory infection. Prescribed rest, fluids, and acetaminophen for fever.",
            // },
        // ];
 */
