import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, getMeUser } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('talentlync_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('talentlync_token');
      const storedUser = localStorage.getItem('talentlync_user');

      if (storedToken && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
          // Try validating with server in background
          const res = await getMeUser();
          if (res.success && res.user) {
            setUser(res.user);
            localStorage.setItem('talentlync_user', JSON.stringify(res.user));
          }
        } catch (err) {
          console.warn('Backend session verification failed, keeping local session:', err);
        }
      } else {
        // Default demo user for instant explore experience
        const defaultDemo = {
          id: 'demo_guest_user',
          name: 'Sarah Connor',
          email: 'sarah.c@talentlync.io',
          company: 'Vertex AI Labs',
          role: 'Head of Talent Acquisition',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
        };
        setUser(defaultDemo);
        setToken('token_demo_guest');
        localStorage.setItem('talentlync_user', JSON.stringify(defaultDemo));
        localStorage.setItem('talentlync_token', 'token_demo_guest');
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const handleLogin = async (email, password) => {
    const res = await loginUser({ email, password });
    if (res.success) {
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem('talentlync_user', JSON.stringify(res.user));
      localStorage.setItem('talentlync_token', res.token);
      return res;
    }
    throw new Error(res.message || 'Login failed');
  };

  const handleRegister = async (registrationData) => {
    const res = await registerUser(registrationData);
    if (res.success) {
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem('talentlync_user', JSON.stringify(res.user));
      localStorage.setItem('talentlync_token', res.token);
      return res;
    }
    throw new Error(res.message || 'Registration failed');
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('talentlync_user');
    localStorage.removeItem('talentlync_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
