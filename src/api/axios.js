import axios from 'axios';
import { getToken, clearAuth } from '@/utils/token';
import { MESSAGES } from '@/constants';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle 401
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuth();
      // Only redirect if not already on auth pages
      const authPaths = ['/login', '/register', '/forgot-password', '/verify-otp', '/reset-password'];
      if (!authPaths.includes(window.location.pathname)) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Helper to extract error message from API responses
export const getErrorMessage = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.response?.data?.errors) {
    return error.response.data.errors.map((e) => e.message).join(', ');
  }
  if (error.message === 'Network Error') {
    return MESSAGES.NETWORK_ERROR;
  }
  return 'Something went wrong. Please try again.';
};

export default axiosInstance;
