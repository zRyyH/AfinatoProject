import { useState, useContext } from "react";
import { AppContext } from "../contexts/appContext";

const useRequest = (protected_route = true) => {
    const { token } = useContext(AppContext);
    const [loading, setLoading] = useState(false);

    async function request(callback, ...args) {
        setLoading(true);

        try {
            const response = await (protected_route ? callback(token, ...args) : callback(...args));
            const payload = {
                status: response.status,
                success: true,
                data: response.data
            }
            console.log(payload)
            return payload;

        } catch (err) {
            console.error("Erro na requisição:", err);
            const payload = {
                success: false,
                error: err.message || "Erro desconhecido"
            }
            console.log(payload)
            return payload;

        } finally {
            setLoading(false);
        }
    }

    return { loading, request };
};

export default useRequest;
