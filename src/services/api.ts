// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Altere para a URL da sua API se necessário
});

export default api;
