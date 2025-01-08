export const handleRequestError = (error) => {
    console.error('Erro na requisição:', error);
    return Promise.reject(error);
};

export const handleResponseError = (error) => {
    if (error.response) {
        alert('Ocorreu um erro inesperado.');
    }
    return Promise.reject(error);
};