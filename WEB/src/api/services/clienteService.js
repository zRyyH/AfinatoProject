import api from '../axios/axiosInstance';
import endpoints from '../endpoints';
import { setAuthorizationHeader } from '../../helpers/setHeaderToken';


// Busca lista de usuários
export const fetchClientes = async (token) => {
    try {
        const { data } = await api.get(endpoints.ALL_CLIENTE, setAuthorizationHeader(token));
        return data;
    } catch (error) {
        throw error; // Repassa o erro para o componente chamar fallback, se necessário
    }
};