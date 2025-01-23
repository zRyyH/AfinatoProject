import axios from 'axios';

const request_api = async (action, table, row_params, appId, accessKey) => {
    const headers = {
        'Content-Type': 'application/json',
        'ApplicationAccessKey': accessKey
    };

    try {
        const url = `https://api.appsheet.com/api/v2/apps/${appId}/tables/${table}/${action}`;

        const body = {
            "Properties": {
                "Locale": "pt-BR"
            },
            "Action": action,
            "Rows": row_params
        };

        console.log(url, body, { headers })

        return await axios.post(url, body, { headers });

    } catch (err) {
        throw new Error('O servidor do AppSheet não respondeu.');
    };
};

export const add_table_row = async (table, row_data, appId, accessKey) => {
    return await request_api('Add', table, [row_data], appId, accessKey);
};

// export const delete_table_row = async (table, row_id, appId, accessKey) => {
//     return await request_api('Delete', table, [{ ['Row ID']: row_id }], appId, accessKey);
// };

export const edit_table_row = async (table, row_data, appId, accessKey) => {
    return await request_api('Edit', table, [row_data], appId, accessKey);
};

export const get_all_table_rows = async (table, appId, accessKey) => {
    return await request_api('Find', table, [], appId, accessKey);
};