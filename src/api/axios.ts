import axios from 'axios';

const api = axios.create({
  baseURL: process.env.BACKEND_API_URL,
});

export default api;
