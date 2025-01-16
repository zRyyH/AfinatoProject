import { useState, useEffect } from 'react';
import { fetchHealthCheck } from '../api/services/authService';
import useRequest from '../hooks/useRequest';

const useLogin = () => {
    const { request } = useRequest(false);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [isAuth, setAuth] = useState(false);
    const [user, setUser] = useState('');

    async function checkToken() {
        try {
            if (token !== null) {
                const { success, data } = await request(fetchHealthCheck, token);
                if (success) {
                    localStorage.setItem('token', token);
                    setUser(data.data);
                    setAuth(true);
                    return;
                }
            }
        } catch (err) {
            setAuth(false);
            setToken(null);
            localStorage.removeItem('token');
        }
    }

    useEffect(() => {
        checkToken();
    }, [token]);

    return { user, token, setToken, isAuth, setAuth };
};

export default useLogin;