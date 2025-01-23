import { get_all_table_rows } from '../utils/appsheet-api.js';

export const getAllClienteService = async (user) => {
    const franchise = user.franchise;
    const appId = user.appId;
    const accessKey = user.accessKey;

    const response = await get_all_table_rows('Cliente', appId, accessKey);
    response.data = response.data.filter(cliente => cliente.Franquia === franchise);
    
    return response;
};