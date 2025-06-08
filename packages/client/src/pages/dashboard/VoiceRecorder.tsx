import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Save, RefreshCw } from "lucide-react";
import Button from "../../components/ui/Button";
import PatientInformation from "../../components/ui/consultations/PatientInformation";
import { Patient } from "../../types/patient";

interface VoiceRecorderProps {
    onSave: (transcription: string[]) => void;
    patientData: Patient | null;
    setPatientData: (value: Patient) => void;
}

const mockTranscriptions = [
    "Good morning, Mr. Sharma. What brings you in today?",
    "Good morning, Doctor. I've been feeling quite tired lately, more than usual, and I've also had this persistent cough for about two weeks now.",
    "I see. Can you describe the cough for me? Is it dry, or are you bringing anything up?",
    "It's mostly dry, but sometimes, especially in the mornings, I feel a bit of phlegm. It's not a lot though.",
    "Any other symptoms you've noticed? Fever, chills, body aches?",
    "No fever, thankfully. I did have a slight headache a few days ago, but that's gone now. No body aches either.",
    "Okay. Have you been around anyone who's been sick recently?",
    "My son had a bit of a cold last week, but he's fine now. Nothing serious, just a runny nose and a sniffle.",
    "And how long have you been feeling this general fatigue?",
    "It's been about three weeks, maybe a month. I just feel drained even after a full night's sleep.",
    "Are you having any trouble sleeping?",
    "Not really. I fall asleep fine, but I wake up feeling like I haven't rested at all.",
    "Have there been any changes in your diet or lifestyle recently?",
    "Not really. Everything's pretty much the same. I try to eat healthy, and I go for a walk most days.",
    "Are you experiencing any shortness of breath, especially when you're active?",
    "A little bit, yes. When I walk up the stairs, I find myself a bit more winded than usual.",
    "Alright. Let's take a look. I'll listen to your chest and then we'll consider some blood tests.",
    "Okay, Doctor.",
    "Breathe deeply for me, please. In and out.",
    "Is everything alright?",
    "Your breathing sounds a little wheezy, Mr. Sharma. Nothing too concerning at this point, but it's good we're looking into it.",
    "So, what do you think it could be?",
    "It could be a number of things. Given the persistent cough and fatigue, we need to rule out a few possibilities. The blood tests will give us a clearer picture.",
    "What kind of blood tests?",
    "We'll do a complete blood count, and also check your thyroid function and some inflammatory markers. This will help us understand if there's an underlying infection or another condition causing your symptoms.",
    "How long will the results take?",
    "You should have them back in about two or three days. Once we get those, we can discuss the next steps.",
    "And in the meantime, what should I do about the cough?",
    "For now, I'd recommend drinking plenty of fluids, warm water with honey can be soothing. Avoid irritants like smoke, and get plenty of rest. If the cough worsens significantly or you develop a fever, please contact us immediately.",
    "Okay, I'll do that. Thank you, Doctor.",
    "You're welcome, Mr. Sharma. We'll be in touch once the results are in.",
];

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
    onSave,
    patientData,
    setPatientData,
}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [transcription, setTranscription] = useState(
        mockTranscriptions.join(" "),
    );
    const [recordingTime, setRecordingTime] = useState(0);
    const timerRef = useRef<number | null>(null);

    // This would be replaced with actual voice recognition in a real implementation
    // useEffect(() => {
    //     if (isRecording) {
    //         let currentIndex = 0;
    //
    //         console.log("mockTranscriptions.length", mockTranscriptions.length);
    //         const interval = setInterval(() => {
    //             console.log("currentIndex", currentIndex);
    //             if (currentIndex < mockTranscriptions.length) {
    //                 setTranscription(
    //                     (prev) =>
    //                         prev +
    //                         (prev ? " " : "") +
    //                         mockTranscriptions[currentIndex],
    //                 );
    //                 currentIndex++;
    //             } else {
    //                 clearInterval(interval);
    //             }
    //         }, 1000);
    //
    //         return () => clearInterval(interval);
    //     }
    // }, [isRecording]);

    useEffect(() => {
        if (isRecording) {
            timerRef.current = window.setInterval(() => {
                setRecordingTime((prev) => prev + 1);
            }, 1000);
        } else if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isRecording]);

    const toggleRecording = () => {
        setIsRecording((prev) => !prev);
        if (isRecording) {
            // Stop recording
            setRecordingTime(0);
        } else {
            // Start recording
            setTranscription("");
        }
    };

    const handleSave = () => {
        onSave(mockTranscriptions);
        setTranscription("");
        setRecordingTime(0);
        setIsRecording(false);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const resetRecording = () => {
        setTranscription("");
        setRecordingTime(0);
        setIsRecording(false);
    };

    return (
        <div className="space-y-6">
            <PatientInformation
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                patientData={patientData}
                setPatientData={setPatientData}
            />
            <div className="rounded-lg border border-secondary-200 bg-white p-6 shadow-md">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-medium text-secondary-900">
                        Voice Recorder
                    </h3>
                    <div className="text-secondary-500">
                        {isRecording && (
                            <span className="flex items-center">
                                <span className="mr-2 h-2.5 w-2.5 animate-pulse rounded-full bg-error-500"></span>
                                Recording: {formatTime(recordingTime)}
                            </span>
                        )}
                    </div>
                </div>

                <div className="mb-6 rounded-md bg-secondary-50 p-4">
                    <div
                        className={`h-40 overflow-y-auto text-secondary-700 ${!transcription && "italic text-secondary-400"}`}
                    >
                        {transcription ||
                            "Transcription will appear here while recording..."}
                    </div>
                </div>

                <div className="flex flex-wrap gap-3">
                    <Button
                        variant={isRecording ? "outline" : "primary"}
                        onClick={toggleRecording}
                        leftIcon={
                            isRecording ? (
                                <MicOff size={16} />
                            ) : (
                                <Mic size={16} />
                            )
                        }
                    >
                        {isRecording ? "Stop Recording" : "Start Recording"}
                    </Button>

                    <Button
                        variant="secondary"
                        onClick={handleSave}
                        leftIcon={<Save size={16} />}
                        disabled={!transcription}
                    >
                        Save & Generate Summary
                    </Button>

                    <Button
                        variant="ghost"
                        onClick={resetRecording}
                        leftIcon={<RefreshCw size={16} />}
                        disabled={!transcription}
                    >
                        Reset
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default VoiceRecorder;
