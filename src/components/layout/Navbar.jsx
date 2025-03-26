import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { user, logout, deleteAccount } = useAuth();
  const navigate = useNavigate();
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );
    
    if (confirmed) {
      deleteAccount();
      navigate('/');
    }
  };
  
  // Get user's initials for avatar
  const getUserInitials = () => {
    if (!user || !user.name) return '?';
    
    const nameParts = user.name.split(' ');
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return nameParts[0][0].toUpperCase();
  };
  
  return (
    <nav className="bg-white border-b border-secondary-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center">
            {/* Replace external placeholder with inline SVG */}
            <img 
              src="/logo.svg" 
              alt="Algo Root Logo" 
              className="w-8 h-8"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = 'https://via.placeholder.com/64?text=AR';
              }}
            />
            <span className="text-xl font-display font-semibold text-secondary-900">
              Algo Root
            </span>
          </div>
        </div>
        
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            className="flex items-center focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="avatar">
              {getUserInitials()}
            </div>
          </button>
          
          {isMenuOpen && (
            <div className="dropdown animate-fade-in">
              <div className="px-4 py-3 border-b border-secondary-200">
                <p className="text-sm font-medium text-secondary-900">{user?.name}</p>
                <p className="text-xs text-secondary-600 truncate">{user?.email}</p>
              </div>
              
              <button
                className="dropdown-item"
                onClick={handleLogout}
              >
                Logout
              </button>
              
              <button
                className="dropdown-item text-danger-600"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;