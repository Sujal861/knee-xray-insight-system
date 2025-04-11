
import axios from 'axios';

// Base API URL - change this to your Flask backend URL when deployed
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add authentication interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication
export const register = async (username: string, email: string, password: string) => {
  return api.post('/register', { username, email, password });
};

export const login = async (username: string, password: string) => {
  const response = await api.post('/login', { username, password });
  const { token, user_id, username: userName, is_admin } = response.data;
  
  // Store auth data in localStorage
  localStorage.setItem('auth_token', token);
  localStorage.setItem('user_id', user_id);
  localStorage.setItem('username', userName);
  localStorage.setItem('is_admin', is_admin.toString());
  
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_id');
  localStorage.removeItem('username');
  localStorage.removeItem('is_admin');
};

// Prediction
export const predictImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  return api.post('/predict', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// User History
export const getUserHistory = async () => {
  return api.get('/history');
};

// Admin routes
export const getUsers = async () => {
  return api.get('/admin/users');
};

export const getAllPredictions = async () => {
  return api.get('/admin/predictions');
};

export default api;
