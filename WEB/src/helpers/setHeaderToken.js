// Helper para configurar token nos cabeçalhos
export const setAuthorizationHeader = (token) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};