import { useState, useContext } from "react";
import { AppContext } from "../contexts/appContext";
import { message } from "antd";


const useRequest = (protected_route = true) => {
    const { token } = useContext(AppContext);
    const [loading, setLoading] = useState(false);

    async function request(callback, ...args) {
        setLoading(true);

        try {
            const response = await (protected_route ? callback(token, ...args) : callback(...args));

            const payload = {
                success: true,
                data: response.data
            };

            const log = response.message

            if (log) message.success(log);
            console.log(response);

            return payload;

        } catch (err) {
            const payload = {
                success: false
            };

            const log = err.response?.data?.message

            if (log) message.error(log);
            console.log(err);

            return payload;

        } finally {
            setLoading(false);
        };
    };

    return { loading, request };
};

export default useRequest;