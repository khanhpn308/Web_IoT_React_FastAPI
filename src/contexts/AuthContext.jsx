import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('iot_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login logic
    const mockUser = {
      id: 'user_' + Date.now(),
      email,
      role: email === 'admin@iot.com' ? 'admin' : 'user',
      name: email.split('@')[0]
    };
    
    setUser(mockUser);
    localStorage.setItem('iot_user', JSON.stringify(mockUser));
    return { success: true, user: mockUser };
  };

  const register = (email, password, name) => {
    // Mock registration logic
    const mockUser = {
      id: 'user_' + Date.now(),
      email,
      role: 'user',
      name
    };
    
    setUser(mockUser);
    localStorage.setItem('iot_user', JSON.stringify(mockUser));
    return { success: true, user: mockUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('iot_user');
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAdmin,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
