import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // If user is already logged in, redirect to details page
  useEffect(() => {
    if (user) {
      navigate('/details');
    }
  }, [user, navigate]);
  
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-800 p-4">
      <div className="auth-card w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 mb-4">
            <img 
              src="/logo.svg" 
              alt="Algo Root Logo" 
              className="w-full h-full"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = 'https://via.placeholder.com/64?text=AR';
              }}
            />
          </div>
          <h1 className="text-2xl font-display font-bold text-secondary-900">
            {isLogin ? 'Welcome Back' : 'Create an Account'}
          </h1>
          <p className="text-secondary-600 mt-2">
            {isLogin 
              ? 'Sign in to access your dashboard' 
              : 'Join Algo Root to start managing your data'}
          </p>
        </div>
        
        {isLogin ? <LoginForm /> : <SignupForm />}
        
        <div className="mt-6 text-center">
          <p className="text-secondary-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={toggleAuthMode}
              className="ml-1 text-primary-600 hover:text-primary-700 font-medium"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;