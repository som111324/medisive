import React from 'react';
import HeroSection from './HeroSection';
import HowItWorksSection from './HowItWorksSection';
import WhyNeededSection from './WhyNeededSection';
import Footer from '../../components/layout/Footer';
import Navbar from '../../components/layout/Navbar';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <WhyNeededSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;