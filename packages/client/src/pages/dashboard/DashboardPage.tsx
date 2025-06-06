import React, { useState, useEffect } from 'react';
import { User, Plus } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import VoiceRecorder from './VoiceRecorder';
import ConsultationItem from './ConsultationItem';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Consultation } from '../../types/consultation';

const generateMockConsultation = (transcription: string): Consultation => {
  const id = `cons_${Math.random().toString(36).substring(2, 9)}`;
  const now = new Date().toISOString();
  
  const mockSummary = "Patient presents with tension headache for three days. No neurological deficits found. Prescribed acetaminophen and stress management techniques.";
  
  return {
    id,
    createdAt: now,
    updatedAt: now,
    transcription,
    summary: mockSummary,
    symptoms: ["Headache", "Stress"],
    diagnosis: ["Tension headache"],
    treatment: ["Acetaminophen 500mg PRN", "Stress management"],
    followUp: "1 week if symptoms persist"
  };
};

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [showRecorder, setShowRecorder] = useState(false);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  
  useEffect(() => {
    // Load mock consultations
    const mockConsultations: Consultation[] = [
      {
        id: 'cons_1',
        patientName: 'Amit Sharma',
        createdAt: '2025-02-15T10:30:00Z',
        updatedAt: '2025-02-15T10:45:00Z',
        transcription: 'Patient presents with fever and cough for 3 days...',
        summary: 'Diagnosed with viral upper respiratory infection. Prescribed rest, fluids, and acetaminophen for fever.',
        symptoms: ['Fever', 'Cough', 'Fatigue'],
        diagnosis: ['Viral URI'],
        treatment: ['Acetaminophen 500mg', 'Rest', 'Hydration'],
        followUp: '5 days if symptoms persist'
      },
      {
        id: 'cons_2',
        patientName: 'Priya Patel',
        createdAt: '2025-02-10T14:15:00Z',
        updatedAt: '2025-02-10T14:35:00Z',
        transcription: 'Patient complains of lower back pain after lifting heavy objects...',
        summary: 'Acute lumbar strain from improper lifting. Advised rest, prescribed muscle relaxants and pain management.',
        symptoms: ['Lower back pain', 'Limited mobility'],
        diagnosis: ['Acute lumbar strain'],
        treatment: ['Diclofenac 50mg', 'Muscle relaxant', 'Heat therapy'],
        followUp: '1 week'
      }
    ];
    
    setConsultations(mockConsultations);
  }, []);

  const handleSaveConsultation = (transcription: string) => {
    const newConsultation = generateMockConsultation(transcription);
    setConsultations(prev => [newConsultation, ...prev]);
    setShowRecorder(false);
  };

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
              Welcome back, {user?.name}
            </p>
          </div>
          
          <div className="mt-4 sm:mt-0">
            <Button
              variant="primary"
              onClick={() => setShowRecorder(prev => !prev)}
              leftIcon={showRecorder ? <User size={16} /> : <Plus size={16} />}
            >
              {showRecorder ? "View Consultations" : "New Consultation"}
            </Button>
          </div>
        </div>
        
        {showRecorder ? (
          <VoiceRecorder onSave={handleSaveConsultation} />
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
                    {consultations.map(consultation => (
                      <ConsultationItem
                        key={consultation.id}
                        consultation={consultation}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="py-6 text-center">
                    <p className="text-secondary-500">No consultations yet. Start a new one to get started.</p>
                    <div className="mt-4">
                      <Button
                        variant="secondary"
                        onClick={() => setShowRecorder(true)}
                        leftIcon={<Plus size={16} />}
                      >
                        New Consultation
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium text-secondary-900">Total Consultations</h3>
                  <p className="mt-2 text-3xl font-bold text-primary-600">{consultations.length}</p>
                  <p className="mt-2 text-sm text-secondary-500">Across all patients</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium text-secondary-900">Time Saved</h3>
                  <p className="mt-2 text-3xl font-bold text-primary-600">
                    {consultations.length * 15} min
                  </p>
                  <p className="mt-2 text-sm text-secondary-500">Compared to manual documentation</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium text-secondary-900">Latest Update</h3>
                  <p className="mt-2 text-base text-secondary-700">Multilingual support for Tamil and Telugu added</p>
                  <p className="mt-2 text-sm text-secondary-500">Updated 2 days ago</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default DashboardPage;