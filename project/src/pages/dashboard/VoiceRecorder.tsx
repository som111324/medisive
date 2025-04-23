import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Save, RefreshCw } from 'lucide-react';
import Button from '../../components/ui/Button';

interface VoiceRecorderProps {
  onSave: (transcription: string) => void;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onSave }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef<number | null>(null);
  
  // This would be replaced with actual voice recognition in a real implementation
  useEffect(() => {
    if (isRecording) {
      const mockTranscriptions = [
        "Patient complains of persistent headache for the past three days.",
        "Pain is described as throbbing and located primarily in the frontal region.",
        "No history of recent trauma. Patient reports increased stress at work.",
        "Current medications include Lisinopril for hypertension.",
        "Vital signs: BP 130/85, pulse 78, temperature 98.6°F.",
        "Patient denies any visual disturbances or nausea.",
        "Neurological examination shows no focal deficits.",
        "Assessment: Tension headache likely due to stress.",
        "Plan: Prescribed acetaminophen 500mg as needed.",
        "Recommended stress management techniques and adequate hydration.",
        "Follow-up in one week if symptoms persist."
      ];
      
      let currentIndex = 0;
      
      const interval = setInterval(() => {
        if (currentIndex < mockTranscriptions.length) {
          setTranscription(prev => 
            prev + (prev ? ' ' : '') + mockTranscriptions[currentIndex]
          );
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [isRecording]);
  
  useEffect(() => {
    if (isRecording) {
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
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
    setIsRecording(prev => !prev);
    if (isRecording) {
      // Stop recording
      setRecordingTime(0);
    } else {
      // Start recording
      setTranscription('');
    }
  };

  const handleSave = () => {
    onSave(transcription);
    setTranscription('');
    setRecordingTime(0);
    setIsRecording(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetRecording = () => {
    setTranscription('');
    setRecordingTime(0);
    setIsRecording(false);
  };

  return (
    <div className="rounded-lg border border-secondary-200 bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium text-secondary-900">Voice Recorder</h3>
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
          className={`h-40 overflow-y-auto text-secondary-700 ${!transcription && 'italic text-secondary-400'}`}
        >
          {transcription || "Transcription will appear here while recording..."}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3">
        <Button
          variant={isRecording ? "outline" : "primary"}
          onClick={toggleRecording}
          leftIcon={isRecording ? <MicOff size={16} /> : <Mic size={16} />}
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
  );
};

export default VoiceRecorder;