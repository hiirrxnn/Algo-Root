import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    if (loginError) {
      setLoginError('');
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Validate email
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setLoginError('');
    
    try {
      // In a real app, we would check user credentials against a database
      // For now, we'll simulate this process using localStorage
      const users = JSON.parse(localStorage.getItem('algoRootUsers') || '[]');
      const user = users.find(
        u => u.email === formData.email && u.password === formData.password
      );
      
      if (user) {
        // Remove password before storing in state
        const { password, ...userWithoutPassword } = user;
        login(userWithoutPassword);
        navigate('/details');
      } else {
        setLoginError('Invalid email or password');
      }
    } catch (error) {
      setLoginError('An error occurred. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {loginError && (
        <div className="p-3 bg-danger-50 border border-danger-200 text-danger-700 rounded-md">
          {loginError}
        </div>
      )}
      
      <div>
        <label htmlFor="email" className="form-label">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`form-input ${errors.email ? 'border-danger-500' : ''}`}
          placeholder="you@example.com"
          autoComplete="email"
        />
        {errors.email && <p className="form-error">{errors.email}</p>}
      </div>
      
      <div>
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`form-input ${errors.password ? 'border-danger-500' : ''}`}
          placeholder="•••••••••"
          autoComplete="current-password"
        />
        {errors.password && <p className="form-error">{errors.password}</p>}
      </div>
      
      <button
        type="submit"
        className="btn btn-primary w-full mt-6"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
};

export default LoginForm;