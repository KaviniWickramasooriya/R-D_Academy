import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

// Sends the multi-step application to the backend database
export const submitApplication = async (formData) => {
  const response = await api.post('/applications', formData);
  return response.data;
};

// Requests Zoom details using the unique student access code[cite: 22]
export const getClassAccess = async (accessCode) => {
  const response = await api.get(`/classes/access?code=${encodeURIComponent(accessCode)}`);
  return response.data;
};

// Gets the generic, public class schedule[cite: 22]
export const getPublicSchedule = async () => {
  const response = await api.get('/classes/schedule');
  return response.data;
};