import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the JWT token to the headers
api.interceptors.request.use(
  (config) => {
    let token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    // If not found in 'token', try to get it from Zustand's 'auth-storage'
    if (!token && typeof window !== 'undefined') {
      const authStorage = localStorage.getItem('auth-storage');
      if (authStorage) {
        try {
          const parsed = JSON.parse(authStorage);
          token = parsed.state?.token;
        } catch (e) {
          console.error('Failed to parse auth-storage', e);
        }
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { config, response } = error;
    if (response?.status === 401 && !config?.url?.includes('/auth/login') && !config?.url?.includes('/auth/register')) {
      if (typeof window !== 'undefined') {
        // Use a more direct way to clear state if possible
        localStorage.removeItem('token');
        localStorage.removeItem('auth-storage');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
