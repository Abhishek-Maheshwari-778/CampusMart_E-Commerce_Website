import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

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
  const [error, setError] = useState(null);

  // Configure axios defaults
  axios.defaults.baseURL = process.env.REACT_APP_API_URL || '/api';

  // Set auth token in axios headers if available
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  };

  // Load user from token on app start
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setAuthToken(token);
        try {
          const response = await axios.get('/auth/profile');
          setUser(response.data);
        } catch (error) {
          console.error('Error loading user:', error);
          setAuthToken(null);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  // Register new user
  const register = async (userData) => {
    try {
      setError(null);
      const response = await axios.post('/auth/register', userData);
      const { token, user: userInfo } = response.data;

      setAuthToken(token);
      setUser(userInfo);
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Login user
  const login = async (credentials) => {
    try {
      setError(null);
      const response = await axios.post('/auth/login', credentials);
      const { token, user: userInfo } = response.data;

      setAuthToken(token);
      setUser(userInfo);
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Logout user
  const logout = () => {
    setAuthToken(null);
    setUser(null);
    setError(null);
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setError(null);
      const response = await axios.put('/auth/profile', userData);
      setUser(response.data.user);
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Profile update failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Change password
  const changePassword = async (passwordData) => {
    try {
      setError(null);
      await axios.put('/auth/change-password', passwordData);
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Password change failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    updateProfile,
    changePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};