import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Save, RefreshCw } from "lucide-react";
import Button from "../../components/ui/Button";
import PatientInformation from "../../components/ui/consultations/PatientInformation";
import { Patient } from "../../types/patient";

interface VoiceRecorderProps {
    onSave: (transcription: string) => void;
    patientData: Patient | null;
    setPatientData: (value: Patient) => void;
}

const mockTranscriptions =
    "Good morning, Mr. Sharma. What brings you in today? Good morning, Doctor. I've been feeling quite tired lately, more than usual, and I've also had this persistent cough for about two weeks now. I see. Can you describe the cough for me? Is it dry, or are you bringing anything up? It's mostly dry, but sometimes, especially in the mornings, I feel a bit of phlegm. It's not a lot though. Any other symptoms you've noticed? Fever, chills, body aches? No fever, thankfully. I did have a slight headache a few days ago, but that's gone now. No body aches either. Okay. Have you been around anyone who's been sick recently? My son had a bit of a cold last week, but he's fine now. Nothing serious, just a runny nose and a sniffle. And how long have you been feeling this general fatigue? It's been about three weeks, maybe a month. I just feel drained even after a full night's sleep. Are you having any trouble sleeping? Not really. I fall asleep fine, but I wake up feeling like I haven't rested at all. Have there been any changes in your diet or lifestyle recently? Not really. Everything's pretty much the same. I try to eat healthy, and I go for a walk most days. Are you experiencing any shortness of breath, especially when you're active? A little bit, yes. When I walk up the stairs, I find myself a bit more winded than usual. Alright. Let's take a look. I'll listen to your chest and then we'll consider some blood tests. Okay, Doctor. Breathe deeply for me, please. In and out. Is everything alright? Your breathing sounds a little wheezy, Mr. Sharma. Nothing too concerning at this point, but it's good we're looking into it. So, what do you think it could be? It could be a number of things. Given the persistent cough and fatigue, we need to rule out a few possibilities. The blood tests will give us a clearer picture. What kind of blood tests? We'll do a complete blood count, and also check your thyroid function and some inflammatory markers. This will help us understand if there's an underlying infection or another condition causing your symptoms. How long will the results take? You should have them back in about two or three days. Once we get those, we can discuss the next steps. And in the meantime, what should I do about the cough? For now, I'd recommend drinking plenty of fluids, warm water with honey can be soothing. Avoid irritants like smoke, and get plenty of rest. If the cough worsens significantly or you develop a fever, please contact us immediately. Okay, I'll do that. Thank you, Doctor. You're welcome, Mr. Sharma. We'll be in touch once the results are in.";

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
    onSave,
    patientData,
    setPatientData,
}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [transcription, setTranscription] = useState("");
    const [recordingTime, setRecordingTime] = useState(0);
    const timerRef = useRef<number | null>(null);

    // const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    // const [audioUrl, setAudioUrl] = useState<string>("");
    //
    // const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    // const streamRef = useRef<MediaStream | null>(null);
    // const chunksRef = useRef<Blob[]>([]);

    // This would be replaced with actual voice recognition in a real implementation
    useEffect(() => {
        if (isRecording) {
            let mockTranscriptionsArray = mockTranscriptions.split(".");
            let currentIndex = 0;

            console.log(
                "mockTranscriptions.length",
                mockTranscriptionsArray.length,
            );
            const interval = setInterval(() => {
                console.log("currentIndex", currentIndex);
                if (currentIndex < mockTranscriptionsArray.length - 1) {
                    setTranscription(
                        (prev) =>
                            prev +
                            (prev ? " " : "") +
                            mockTranscriptionsArray[currentIndex],
                    );
                    currentIndex++;
                } else {
                    clearInterval(interval);
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [isRecording]);

    /*
    const startRecording = async (): Promise<void> => {
        try {
            // Request microphone access
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100,
                },
            });

            streamRef.current = stream;

            // Create MediaRecorder instance
            const mediaRecorder = new MediaRecorder(stream, {
                mimeType: MediaRecorder.isTypeSupported("audio/webm")
                    ? "audio/webm"
                    : "audio/mp4",
            });

            mediaRecorderRef.current = mediaRecorder;
            chunksRef.current = [];

            // Handle data available event
            mediaRecorder.ondataavailable = (event: BlobEvent) => {
                if (event.data.size > 0) {
                    chunksRef.current.push(event.data);
                }
            };

            // Handle recording stop
            mediaRecorder.onstop = async () => {
                const blob = new Blob(chunksRef.current, {
                    type: mediaRecorder.mimeType || "audio/webm",
                });

                setAudioBlob(blob);
                setAudioUrl(URL.createObjectURL(blob));

                console.log("Stopping media recorder");
                console.log("audioBlob in voiceRecorder", blob);
                console.log(
                    "audioUrl in voiceRecorder",
                    URL.createObjectURL(blob),
                );

                // Stop all tracks to release microphone
                if (streamRef.current) {
                    streamRef.current
                        .getTracks()
                        .forEach((track) => track.stop());
                }

                // call speech to text
                // const str = await convertAudioBlobToText(blob, {
                //     language: "en-US",
                //     continuous: true,
                //     interimResults: false,
                // });
                // console.log(str);

                const formData = new FormData();
                formData.append("file", blob, "audio.webm");

                const res = await fetch("http://localhost:8000/transcribe", {
                    method: "POST",
                    body: formData,
                });

                console.log("res from python api", res);
            };

            // Start recording
            mediaRecorder.start(100); // Collect data every 100ms
            setIsRecording(true);
            setRecordingTime(0);

            // Start timer
            timerRef.current = setInterval(() => {
                setRecordingTime((prev) => prev + 1);
            }, 1000);
        } catch (error) {
            console.error("Error accessing microphone:", error);
            alert(
                "Error accessing microphone. Please ensure you have granted permission.",
            );
        }
    };

    const downloadRecording = (): void => {
        if (audioBlob) {
            const url = URL.createObjectURL(audioBlob);
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = `recording_${new Date().toISOString().slice(0, 19).replace(/:/g, "-")}.webm`;

            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            // Clean up the URL
            URL.revokeObjectURL(url);
        }
    };

    const stopRecording = (): void => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);

            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        }
    };
    */

    const resetRecording = (): void => {
        setRecordingTime(0);
        setTranscription("");
        setIsRecording(false);
    };

    useEffect(() => {
        if (isRecording) {
            timerRef.current = window.setInterval(() => {
                setRecordingTime((prev) => prev + 1);
            }, 1000);
            // startRecording();
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
            // stopRecording();
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

            {/* {audioBlob && ( */}
            {/*     <div className="space-y-4"> */}
            {/*         <div className="text-center"> */}
            {/*             <h3 className="text-lg font-semibold mb-2 text-gray-700"> */}
            {/*                 Recording Complete */}
            {/*             </h3> */}
            {/*             <audio */}
            {/*                 controls */}
            {/*                 src={audioUrl} */}
            {/*                 className="w-full mb-4" */}
            {/*                 preload="metadata" */}
            {/*             /> */}
            {/*         </div> */}
            {/**/}
            {/*         <div className="flex justify-center gap-3"> */}
            {/*             <button */}
            {/*                 onClick={downloadRecording} */}
            {/*                 className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors" */}
            {/*             > */}
            {/*                 <Download size={16} /> */}
            {/*                 Download */}
            {/*             </button> */}
            {/**/}
            {/*             <button */}
            {/*                 onClick={resetRecording} */}
            {/*                 className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors" */}
            {/*             > */}
            {/*                 New Recording */}
            {/*             </button> */}
            {/*         </div> */}
            {/**/}
            {/*         <div className="text-sm text-gray-600 text-center"> */}
            {/*             File size: {(audioBlob.size / 1024).toFixed(1)} KB */}
            {/*         </div> */}
            {/*     </div> */}
            {/* )} */}
        </div>
    );
};

export default VoiceRecorder;
