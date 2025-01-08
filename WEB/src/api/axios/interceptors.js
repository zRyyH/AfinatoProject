import api from './axiosInstance';
import { handleRequestError, handleResponseError } from './errorHandler';


// Rotas que não precisam de token
const excludeRoutes = ['/auth'];

// Verifica se uma rota está na lista de exclusão
const isRouteExcluded = (url, excludeRoutes) => {
    return excludeRoutes.some((route) => url.startsWith(route)); // Suporte a subrotas
};

// Configura o cabeçalho de autorização, se necessário
const setAuthorizationHeader = (config, token, excludeRoutes) => {
    if (token && !isRouteExcluded(config.url, excludeRoutes)) {
        config.headers.Authorization = `Bearer ${token}`;
    }
};

// Interceptador para requisições
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        setAuthorizationHeader(config, token, excludeRoutes);

        console.log(`Requisição enviada para ${config.url} com método ${config.method}`);

        if (config.headers.Authorization) {
            console.log('Token incluído no cabeçalho.');
        } else {
            console.log('Nenhum token incluído no cabeçalho.');
        }


        return config;
    },
    (error) => {
        console.error('Erro ao enviar requisição:', error);
        return Promise.reject(error);
    }
);

// Interceptador para respostas
api.interceptors.response.use(
    (response) => {
        console.log('Resposta recebida:', response);
        return response;
    },
    (error) => {
        // Tratamento centralizado de erros
        if (error.response?.status === 401) {
            console.error('Erro 401: Não autorizado.');
            localStorage.removeItem('token'); // Remove o token inválido
        }
        return handleResponseError(error);
    }
);

export default api;
