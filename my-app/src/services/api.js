import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Your backend API base URL
});

export default api;
