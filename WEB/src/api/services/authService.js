import api from '../axios/axiosInstance';
import endpoints from '../endpoints';
import { setAuthorizationHeader } from '../../helpers/setHeaderToken';


// Obter token Google
export const fetchGoogleAuth = async (googleToken) => {
    try {
        const response = await api.get(endpoints.AUTH_GOOGLE, setAuthorizationHeader(googleToken));
        return response;
    } catch (err) {
        throw err; // Propaga o erro para quem chama
    }
};


// Obter token API
export const fetchAuth = async (payload) => {
    try {
        const response = await api.post(endpoints.AUTH, payload);
        return response;
    } catch (err) {
        throw err; // Propaga o erro para quem chama
    }
};


// Checar se o token é válido
export const fetchHealthCheck = async (token) => {
    try {
        const response = await api.get(endpoints.HEALTH, setAuthorizationHeader(token));
        return response;
    } catch (err) {
        throw err; // Propaga o erro para quem chama
    }
};