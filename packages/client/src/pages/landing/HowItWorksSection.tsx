import React from 'react';
import { Mic, FileText, Languages, Server } from 'lucide-react';
import Card, { CardContent } from '../../components/ui/Card';

const features = [
  {
    icon: <Mic className="h-12 w-12 text-primary-500" />,
    title: 'Voice-to-Text Transcription',
    description: 'Simply speak naturally during patient consultations. Our AI captures and transcribes your voice in real-time with high accuracy.',
  },
  {
    icon: <Languages className="h-12 w-12 text-primary-500" />,
    title: 'Multilingual Support',
    description: 'Communicate in Hindi, English, Tamil, Telugu, and other Indian languages. Our system understands regional accents and medical terminology.',
  },
  {
    icon: <FileText className="h-12 w-12 text-primary-500" />,
    title: 'AI-Generated Smart Summaries',
    description: 'Convert lengthy consultations into concise, structured clinical notes with key findings, diagnoses, and treatment plans highlighted.',
  },
  {
    icon: <Server className="h-12 w-12 text-primary-500" />,
    title: 'Seamless EMR Integration',
    description: 'Integration-ready with popular electronic medical record systems used in Indian hospitals and clinics for streamlined workflow.',
  },
];

const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="bg-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-secondary-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-secondary-600">
            Our AI-powered platform simplifies the clinical documentation process,
            allowing you to focus on patient care.
          </p>
        </div>
        
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="transition-all duration-300 hover:shadow-lg">
              <CardContent className="flex flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-50">
                  {feature.icon}
                </div>
                <h3 className="mt-6 text-xl font-medium text-secondary-900">
                  {feature.title}
                </h3>
                <p className="mt-3 text-base text-secondary-600">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-20">
          <div className="overflow-hidden rounded-lg bg-primary-50 shadow-xl">
            <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:p-20">
              <div className="lg:w-0 lg:flex-1">
                <h3 className="text-2xl font-extrabold tracking-tight text-secondary-900 sm:text-3xl">
                  Experience it in action
                </h3>
                <p className="mt-4 max-w-3xl text-lg text-secondary-600">
                  See how MedScribe AI transforms the way doctors in India create and manage clinical documentation.
                  Get started with a free trial today.
                </p>
              </div>
              <div className="mt-12 sm:mt-16 sm:w-full sm:max-w-md lg:mt-0 lg:ml-8 lg:flex-1">
                <div className="relative h-0 overflow-hidden rounded-lg pb-[56.25%] shadow-lg">
                  <div className="absolute inset-0 flex items-center justify-center bg-secondary-900">
                    <p className="text-center text-white">Video Demo Placeholder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;