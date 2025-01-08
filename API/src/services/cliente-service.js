import { get_all_table_rows } from '../utils/appsheet-api.js';

export const getAllClienteService = async (franchise) => {
    const response = await get_all_table_rows('Cliente');
    response.data = response.data.filter(cliente => cliente.Franquia === franchise);
    return response;
};