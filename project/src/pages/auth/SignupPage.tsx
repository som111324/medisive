import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, ArrowRight } from 'lucide-react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Card, { CardContent, CardFooter, CardHeader } from '../../components/ui/Card';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../../components/layout/Navbar';

const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
  }>({});
  
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      phone?: string;
      password?: string;
    } = {};
    let isValid = true;

    if (!name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!phone) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        await signup(name, email, phone, password);
        navigate('/dashboard');
      } catch (error) {
        console.error('Signup failed:', error);
        // Handle signup error
      }
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <Navbar />
      
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-secondary-900">Create your account</h2>
                <p className="mt-2 text-sm text-secondary-600">
                  Already have an account?{' '}
                  <Link to="/auth/login" className="font-medium text-primary-600 hover:text-primary-500">
                    Sign in
                  </Link>
                </p>
              </div>
            </CardHeader>
            
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <Input
                  label="Full Name"
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dr. Rajesh Kumar"
                  leftIcon={<User size={18} />}
                  error={errors.name}
                  fullWidth
                  required
                />
                
                <Input
                  label="Email Address"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="doctor@example.com"
                  leftIcon={<Mail size={18} />}
                  error={errors.email}
                  fullWidth
                  required
                />
                
                <Input
                  label="Phone Number"
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9876543210"
                  leftIcon={<Phone size={18} />}
                  error={errors.phone}
                  fullWidth
                  required
                />
                
                <Input
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  leftIcon={<Lock size={18} />}
                  error={errors.password}
                  fullWidth
                  required
                />
                
                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                    required
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-secondary-700">
                    I agree to the{' '}
                    <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                      Privacy Policy
                    </a>
                  </label>
                </div>
                
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  isLoading={isLoading}
                  rightIcon={<ArrowRight size={16} />}
                >
                  Create Account
                </Button>
              </form>
            </CardContent>
            
            <CardFooter>
              <p className="text-center text-xs text-secondary-500">
                By creating an account, you confirm that you are a licensed healthcare professional
                in India and will use this service in compliance with applicable regulations.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;