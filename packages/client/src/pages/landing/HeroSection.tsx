import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

const HeroSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 to-primary-900 text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Revolutionizing Clinical Documentation in Indian Healthcare
            </h1>
            <p className="mt-6 text-xl leading-relaxed">
              AI-powered, multilingual, real-time documentation built for doctors in India.
              Focus on patient care, not paperwork.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/auth/signup">
                <Button 
                  variant="secondary" 
                  size="lg"
                  rightIcon={<ArrowRight size={16} />}
                >
                  Get Started
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </a>
            </div>
          </div>
          
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-lg rounded-2xl bg-white/10 p-6 shadow-xl backdrop-blur-sm">
              <div className="space-y-4 text-white">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-primary-300"></div>
                  <p className="text-lg font-semibold">Voice-to-text transcription</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-primary-300"></div>
                  <p className="text-lg font-semibold">Smart medical summaries</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-primary-300"></div>
                  <p className="text-lg font-semibold">Regional language support</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-primary-300"></div>
                  <p className="text-lg font-semibold">EMR integration-ready</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-primary-300"></div>
                  <p className="text-lg font-semibold">HIPAA & local compliance</p>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-primary-400 opacity-50 blur-xl"></div>
              <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-primary-300 opacity-50 blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
          <path 
            fill="#f9fafb" 
            fillOpacity="1" 
            d="M0,32L60,42.7C120,53,240,75,360,80C480,85,600,75,720,58.7C840,43,960,21,1080,16C1200,11,1320,21,1380,26.7L1440,32L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;