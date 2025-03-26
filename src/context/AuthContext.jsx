import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('algoRootUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login user
  const login = (userData) => {
    // In a real app, we would make an API call here
    // For now, just store the user data in localStorage
    localStorage.setItem('algoRootUser', JSON.stringify(userData));
    setUser(userData);
    return true;
  };

  // Register user
  const register = (userData) => {
    // In a real app, we would make an API call here
    // For now, we'll just simulate storing user data
    const users = JSON.parse(localStorage.getItem('algoRootUsers') || '[]');
    
    // Check if email already exists
    const emailExists = users.some(user => user.email === userData.email);
    if (emailExists) {
      return { success: false, message: 'Email already registered' };
    }
    
    // Add user to "database"
    const newUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      // In a real app, we would hash the password
      password: userData.password, 
    };
    
    users.push(newUser);
    localStorage.setItem('algoRootUsers', JSON.stringify(users));
    
    // Log in the user
    const { password, ...userWithoutPassword } = newUser;
    login(userWithoutPassword);
    
    return { success: true };
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('algoRootUser');
    setUser(null);
  };

  // Delete user account
  const deleteAccount = () => {
    if (!user) return;
    
    const users = JSON.parse(localStorage.getItem('algoRootUsers') || '[]');
    const updatedUsers = users.filter(u => u.email !== user.email);
    
    localStorage.setItem('algoRootUsers', JSON.stringify(updatedUsers));
    localStorage.removeItem('algoRootUser');
    
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    deleteAccount
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};