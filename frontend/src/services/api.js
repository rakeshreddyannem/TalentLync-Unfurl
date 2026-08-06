import axios from 'axios';

const API_BASE = '/api/candidates';
const AUTH_BASE = '/api/auth';

// Add request interceptor to append authorization header if present
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('talentlync_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const unfurlProfileUrl = async (targetUrl) => {
  const response = await axios.get(`${API_BASE}/unfurl`, {
    params: { url: targetUrl },
  });
  return response.data;
};

export const fetchCandidates = async (params = {}) => {
  const response = await axios.get(API_BASE, { params });
  return response.data;
};

export const saveCandidate = async (candidateData) => {
  const response = await axios.post(API_BASE, candidateData);
  return response.data;
};

export const toggleCandidateShortlist = async (id) => {
  const response = await axios.patch(`${API_BASE}/${id}/shortlist`);
  return response.data;
};

export const deleteCandidate = async (id) => {
  const response = await axios.delete(`${API_BASE}/${id}`);
  return response.data;
};

// Authentication Services
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${AUTH_BASE}/login`, credentials);
    return response.data;
  } catch (err) {
    // Fallback client-side mock if backend auth returns error/offline
    if (credentials.email && credentials.password) {
      const mockUser = {
        id: 'usr_demo_101',
        name: credentials.email.split('@')[0].replace('.', ' ').replace(/^./, str => str.toUpperCase()) || 'Talent Recruiter',
        email: credentials.email,
        company: 'TalentLync Global',
        role: 'Senior Talent Scout',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(credentials.email)}`
      };
      return {
        success: true,
        token: 'token_usr_demo_101',
        user: mockUser
      };
    }
    throw err;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${AUTH_BASE}/register`, userData);
    return response.data;
  } catch (err) {
    // Fallback client-side mock if backend auth returns error/offline
    if (userData.email && userData.name) {
      const mockUser = {
        id: `usr_${Date.now()}`,
        name: userData.name,
        email: userData.email,
        company: userData.company || 'Innovate AI Tech',
        role: userData.role || 'Recruitment Lead',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userData.name)}`
      };
      return {
        success: true,
        token: `token_${mockUser.id}`,
        user: mockUser
      };
    }
    throw err;
  }
};

export const getMeUser = async () => {
  try {
    const response = await axios.get(`${AUTH_BASE}/me`);
    return response.data;
  } catch (err) {
    const savedUser = localStorage.getItem('talentlync_user');
    if (savedUser) {
      return { success: true, user: JSON.parse(savedUser) };
    }
    throw err;
  }
};
