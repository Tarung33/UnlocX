import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add auth token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth endpoints
export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (userData) => api.post('/auth/login', userData);
export const getCurrentUser = () => api.get('/auth/me');
export const getUserStats = () => api.get('/users/stats');

// Platform endpoints
export const getPlatforms = () => api.get('/platforms');
export const getPlatform = (id) => api.get(`/platforms/${id}`);
export const connectPlatform = (id) => api.post(`/platforms/${id}/connect`);
export const disconnectPlatform = (id) => api.delete(`/platforms/${id}/connect`);

// Goal endpoints
export const getGoals = (params) => api.get('/goals', { params });
export const getGoal = (id) => api.get(`/goals/${id}`);
export const createGoal = (goalData) => api.post('/goals', goalData);
export const updateGoalProgress = (id, progressData) => api.put(`/goals/${id}/progress`, progressData);
export const deleteGoal = (id) => api.delete(`/goals/${id}`);

// Reward endpoints
export const getRewards = () => api.get('/rewards');
export const getReward = (id) => api.get(`/rewards/${id}`);
export const claimReward = (id) => api.post(`/rewards/${id}/claim`);



export default api;

