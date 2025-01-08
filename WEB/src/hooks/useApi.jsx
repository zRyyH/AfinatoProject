import { useState, useEffect, useCallback } from 'react';

/**
 * Hook para consumir APIs de forma eficiente
 * @param {Function} apiFunction - Função do serviço que consome a API (ex.: fetchUsuarios)
 * @param {Array} dependencies - Dependências que devem disparar a chamada
 * @param {any} initialPayload - Payload inicial para a requisição (opcional)
 * @returns {Object} - Estados e funções relacionadas à requisição
 */

const useApi = (apiFunction, dependencies = [], initialPayload = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [payload, setPayload] = useState(initialPayload);

    const fetchData = useCallback(
        async (customPayload = null) => {
            setLoading(true);
            setError(null);
            try {
                const result = customPayload
                    ? await apiFunction(customPayload)
                    : payload
                        ? await apiFunction(payload)
                        : await apiFunction();
                setData(result);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        },
        [apiFunction, payload]
    );

    useEffect(() => {
        fetchData();
    }, [fetchData, ...dependencies]);

    return { data, loading, error, refetch: fetchData, setPayload };
};

export default useApi;