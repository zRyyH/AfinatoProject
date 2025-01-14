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


// Cria uma nova consulta
export const fetchCreateConsulta = async (token, payload) => {
    try {
        const headers = setAuthorizationHeader(token)
        const response = await api.post(endpoints.CONSULTA, payload, headers);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        throw error;
    }
};


// Deletar uma consulta
export const fetchDeleteConsulta = async (token, payload) => {
    try {
        const headers = setAuthorizationHeader(token)
        const response = await api.delete(endpoints.CONSULTA, payload, headers);
        return response.data;

    } catch (error) {
        console.error('Erro ao deletar consulta:', error);
        throw error;
    }
};


// Obtem todas as consultas
export const fetchAllConsultas = async (token) => {
    try {
        const response = await api.get(endpoints.ALL_CONSULTA, setAuthorizationHeader(token));
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        throw error;
    }
};