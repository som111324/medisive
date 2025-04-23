import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div>
            <div className="flex items-center">
              <Heart className="h-6 w-6 text-primary-400" />
              <span className="ml-2 text-xl font-bold">MedScribe AI</span>
            </div>
            <p className="mt-4 text-sm text-secondary-300">
              AI-powered clinical documentation solution tailored for the Indian healthcare system.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-secondary-300 hover:text-primary-400">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-secondary-300 hover:text-primary-400">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-secondary-300 hover:text-primary-400">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-secondary-300 hover:text-primary-400">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-secondary-300 hover:text-primary-400">Home</Link>
              </li>
              <li>
                <a href="#how-it-works" className="text-secondary-300 hover:text-primary-400">How It Works</a>
              </li>
              <li>
                <a href="#why-needed" className="text-secondary-300 hover:text-primary-400">Why It's Needed</a>
              </li>
              <li>
                <Link to="/auth/login" className="text-secondary-300 hover:text-primary-400">Login</Link>
              </li>
              <li>
                <Link to="/auth/signup" className="text-secondary-300 hover:text-primary-400">Sign Up</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-secondary-300 hover:text-primary-400">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-primary-400">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-primary-400">Data Processing</a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-primary-400">HIPAA Compliance</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-secondary-300" />
                <span className="text-secondary-300">Bangalore, Karnataka, India</span>
              </li>
              <li className="flex items-start">
                <Phone className="mr-2 h-5 w-5 text-secondary-300" />
                <span className="text-secondary-300">+91 9876543210</span>
              </li>
              <li className="flex items-start">
                <Mail className="mr-2 h-5 w-5 text-secondary-300" />
                <span className="text-secondary-300">contact@medscribeai.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-secondary-700 pt-8 text-center">
          <p className="text-sm text-secondary-400">
            &copy; {new Date().getFullYear()} MedScribe AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;