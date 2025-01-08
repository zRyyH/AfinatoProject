import { AppContext } from '../contexts/appContext';
import useLogin from '../hooks/useLogin';
import App from '../app';

export default function AppProvider() {
    const { user, token, setToken, isAuth, setAuth } = useLogin();

    return (
        <AppContext.Provider value={{
            token,
            isAuth,
            setAuth,
            user,
            setToken
        }} >
            <App />
        </AppContext.Provider>
    );
};