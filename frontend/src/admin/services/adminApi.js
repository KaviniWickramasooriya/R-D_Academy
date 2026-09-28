import axios from 'axios';

const adminApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginAdmin = async (credentials) => {
  const response = await adminApi.post('/auth/login', credentials);
  return response.data;
};

export const getApplications = async (filters) => {
  const params = new URLSearchParams(filters).toString();
  const response = await adminApi.get(`/admin/applications?${params}`);
  return response.data;
};

export const getApplicationDetails = async (id) => {
  const response = await adminApi.get(`/admin/applications/${id}`);
  return response.data;
};

export const updateApplicationStatus = async (id, status, reason = '') => {
  const response = await adminApi.put(`/admin/applications/${id}/status`, { status, reason });
  return response.data;
};

export const addAdminNote = async (id, note) => {
  const response = await adminApi.post(`/admin/applications/${id}/notes`, { note });
  return response.data;
};