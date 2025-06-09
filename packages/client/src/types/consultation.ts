import { Doctor } from "./doctor";
import { Patient } from "./patient";

export interface Consultation {
    id: string;
    created_at: string;
    patient: Patient;
    doctor: Doctor;
    transcription: string;
    summary: string;
    follow_up: string;
    treatment: string;
    symptoms: string;
    chief_complaint: string;
}
