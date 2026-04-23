import axios from 'axios';

// Changed the hardcoded localhost to your LIVE Render Backend URL
const API_URL = process.env.REACT_APP_API_URL || 'https://lost-and-found-management-system-awda.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    // Note: Ensure your backend middleware looks for 'Bearer ' or 'x-auth-token'
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const register = (name, email, password) => {
  return api.post('/auth/register', { name, email, password });
};

export const login = (email, password) => {
  return api.post('/auth/login', { email, password });
};

// Item APIs
export const getAllItems = () => {
  return api.get('/items');
};

export const getItemById = (id) => {
  return api.get(`/items/${id}`);
};

export const createItem = (itemData) => {
  return api.post('/items', itemData);
};

export const updateItem = (id, itemData) => {
  return api.put(`/items/${id}`, itemData);
};

export const deleteItem = (id) => {
  return api.delete(`/items/${id}`);
};

export const searchItems = (name) => {
  return api.get(`/items/search?name=${name}`);
};

export default api;