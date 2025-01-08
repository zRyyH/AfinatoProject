import axios from 'axios';

// Instância do Axios configurada
const api = axios.create({
    baseURL: 'https://afinatoapi.awpsoft.com.br:5000', // URL base da API
    timeout: 10000, // Timeout de 10 segundos
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;