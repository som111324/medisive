import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Card, { CardContent, CardFooter, CardHeader } from '../../components/ui/Card';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../../components/layout/Navbar';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    let isValid = true;

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
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
        await login(email, password);
        navigate('/dashboard');
      } catch (error) {
        console.error('Login failed:', error);
        // Handle login error
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
                <h2 className="text-2xl font-bold text-secondary-900">Sign in to your account</h2>
                <p className="mt-2 text-sm text-secondary-600">
                  Or{' '}
                  <Link to="/auth/signup" className="font-medium text-primary-600 hover:text-primary-500">
                    create a new account
                  </Link>
                </p>
              </div>
            </CardHeader>
            
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit}>
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
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-secondary-700">
                      Remember me
                    </label>
                  </div>
                  
                  <div className="text-sm">
                    <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                      Forgot your password?
                    </a>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  isLoading={isLoading}
                  rightIcon={<ArrowRight size={16} />}
                >
                  Sign in
                </Button>
              </form>
            </CardContent>
            
            <CardFooter>
              <p className="text-center text-xs text-secondary-500">
                By signing in, you agree to our{' '}
                <a href="#" className="text-primary-600 hover:text-primary-500">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary-600 hover:text-primary-500">
                  Privacy Policy
                </a>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;