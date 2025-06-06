export interface Consultation {
  id: string;
  patientName?: string;
  patientId?: string;
  createdAt: string;
  updatedAt: string;
  transcription: string;
  summary: string;
  symptoms?: string[];
  diagnosis?: string[];
  treatment?: string[];
  followUp?: string;
}