import { useContext, useState } from 'react';
import { fetchAuth, fetchGoogleAuth } from '../api/services/authService';
import { AppContext } from '../contexts/appContext';
import useRequest from './useRequest';
import { message } from 'antd';

const useAuth = () => {
    const [payload, setPayload] = useState(null);
    const [apiGoogleToken, setApiGoogleToken] = useState(null);

    const { loading, request } = useRequest(false);
    const { setToken } = useContext(AppContext);


    async function googleAuth(google_token) {
        try {
            const { data } = await request(fetchGoogleAuth, google_token);
            setApiGoogleToken(data.token)
            setPayload(data.payload)

            return true;
        } catch (err) {
            alert('Erro ao autenticar email do usuario!')
            throw err;
        }
    }


    async function userAuth(user_id) {
        try {
            const { data } = await request(fetchAuth, apiGoogleToken, user_id);
            setToken(data.token)

            return true;
        } catch (err) {
            message.error("Erro ao logar usuario!")
            throw err;
        }
    };


    return { payload, loading, userAuth, googleAuth };
};

export default useAuth;