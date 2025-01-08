import api from '../axios/axiosInstance';
import endpoints from '../endpoints';
import { setAuthorizationHeader } from '../../helpers/setHeaderToken';


// Busca lista de usuários
export const fetchConsultas = async (token) => {
    try {
        const response = await api.get(endpoints.CONSULTA, setAuthorizationHeader(token));
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        throw error; // Repassa o erro para o componente chamar fallback, se necessário
    }
};


// Busca lista de usuários
export const fetchCreateConsulta = async (token, payload) => {
    try {
        const headers = setAuthorizationHeader(token)
        const response = await api.post(endpoints.CONSULTA, payload, headers);
        console.log();
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        throw error;
    }
};


// Busca lista de usuários
export const fetchAllConsultas = async (token) => {
    try {
        const response = await api.get(endpoints.ALL_CONSULTA, setAuthorizationHeader(token));
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        throw error;
    }
};