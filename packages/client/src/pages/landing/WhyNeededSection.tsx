import React from 'react';
import { Clock, FileStack, Languages as Language, Award } from 'lucide-react';

const WhyNeededSection: React.FC = () => {
  return (
    <section id="why-needed" className="bg-secondary-50 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-secondary-900 sm:text-4xl">
            Why Indian Healthcare Needs MedScribe AI
          </h2>
          <p className="mt-4 text-lg text-secondary-600">
            Addressing the unique documentation challenges faced by healthcare professionals in India
          </p>
        </div>
        
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="relative rounded-2xl bg-white p-6 shadow-md transition-transform duration-300 hover:-translate-y-1">
              <div className="absolute -top-6 left-6 rounded-lg bg-primary-600 p-3 shadow-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="mt-4 pt-4">
                <h3 className="text-xl font-medium text-secondary-900">
                  Overburdened with Paperwork
                </h3>
                <p className="mt-3 text-base text-secondary-600">
                  Indian doctors spend up to 30% of their time on documentation, reducing patient interaction time. 
                  MedScribe AI cuts documentation time by 70%, allowing more focus on patient care.
                </p>
              </div>
            </div>
            
            <div className="relative rounded-2xl bg-white p-6 shadow-md transition-transform duration-300 hover:-translate-y-1">
              <div className="absolute -top-6 left-6 rounded-lg bg-primary-600 p-3 shadow-lg">
                <FileStack className="h-6 w-6 text-white" />
              </div>
              <div className="mt-4 pt-4">
                <h3 className="text-xl font-medium text-secondary-900">
                  Time Lost in Manual Documentation
                </h3>
                <p className="mt-3 text-base text-secondary-600">
                  With high patient volumes in Indian healthcare settings, manual documentation creates bottlenecks.
                  Our AI-powered solution provides real-time transcription and structured notes instantly.
                </p>
              </div>
            </div>
            
            <div className="relative rounded-2xl bg-white p-6 shadow-md transition-transform duration-300 hover:-translate-y-1">
              <div className="absolute -top-6 left-6 rounded-lg bg-primary-600 p-3 shadow-lg">
                <Language className="h-6 w-6 text-white" />
              </div>
              <div className="mt-4 pt-4">
                <h3 className="text-xl font-medium text-secondary-900">
                  Language Barriers in Digital Health
                </h3>
                <p className="mt-3 text-base text-secondary-600">
                  Many existing solutions don't support Indian languages or account for regional accents.
                  MedScribe AI is built from the ground up with multilingual support for Indian healthcare.
                </p>
              </div>
            </div>
            
            <div className="relative rounded-2xl bg-white p-6 shadow-md transition-transform duration-300 hover:-translate-y-1">
              <div className="absolute -top-6 left-6 rounded-lg bg-primary-600 p-3 shadow-lg">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div className="mt-4 pt-4">
                <h3 className="text-xl font-medium text-secondary-900">
                  Compliance and Data Security
                </h3>
                <p className="mt-3 text-base text-secondary-600">
                  Indian healthcare requires strict adherence to local data protection regulations.
                  Our platform is fully compliant with Indian healthcare data standards and HIPAA guidelines.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 rounded-lg bg-gradient-to-r from-primary-600 to-primary-800 shadow-xl">
          <div className="px-6 py-12 sm:px-12 sm:py-16 md:flex md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Ready to transform your documentation workflow?
              </h3>
              <p className="mt-3 text-lg text-primary-100">
                Join thousands of Indian healthcare professionals already saving hours each day.
              </p>
            </div>
            <div className="mt-8 md:mt-0">
              <a
                href="#"
                className="inline-flex items-center rounded-md border border-transparent bg-white px-6 py-3 text-base font-medium text-primary-600 shadow-md hover:bg-primary-50"
              >
                Start Free Trial
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyNeededSection;