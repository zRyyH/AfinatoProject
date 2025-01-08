import axiosRetry from 'axios-retry';
import api from './axiosInstance';

// Configuração de retry
axiosRetry(api, {
    retries: 3, // Tenta 3 vezes
    retryDelay: (retryCount) => {
        console.log(`Tentativa ${retryCount}...`);
        return retryCount * 2000; // Delay crescente: 2s, 4s, 6s...
    },
    retryCondition: (error) => {
        // Retenta apenas em falhas de rede ou erros de servidor (5xx)
        return error.response?.status >= 500 || !error.response;
    },
});

export default api;