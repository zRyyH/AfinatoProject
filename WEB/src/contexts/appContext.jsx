import { createContext } from 'react';
export const AppContext = createContext({
    token: null,
    setToken: null,
    isAuth: false,
    setAuth: null,
    user: null
});