import api from '../axios/axiosInstance';
import endpoints from '../endpoints';
import { setAuthorizationHeader } from '../../helpers/setHeaderToken';


// Busca lista de usuários
export const fetchConsultas = async (token) => {
    try {
        const { data } = await api.get(endpoints.CONSULTA, setAuthorizationHeader(token));
        return data;
    } catch (error) {
        throw error; // Repassa o erro para o componente chamar fallback, se necessário
    }
};


// Cria uma nova consulta
export const fetchCreateConsulta = async (token, payload) => {
    try {
        const headers = setAuthorizationHeader(token)
        const { data } = await api.post(endpoints.CONSULTA, payload, headers);
        return data;
    } catch (error) {
        throw error;
    }
};


// Deletar uma consulta
export const fetchDeleteConsulta = async (token, payload) => {
    try {
        const headers = setAuthorizationHeader(token)
        const { data } = await api.delete(endpoints.CONSULTA, payload, headers);
        return data;

    } catch (error) {
        throw error;
    }
};


// Obtem todas as consultas
export const fetchAllConsultas = async (token) => {
    try {
        const { data } = await api.get(endpoints.ALL_CONSULTA, setAuthorizationHeader(token));
        return data;
    } catch (error) {
        throw error;
    }
};