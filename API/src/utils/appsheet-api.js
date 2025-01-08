import axios from 'axios';

const appId = '4d6b1d71-9c1b-443c-a292-4c8452c8aa9f';
const applicationAccessKey = 'V2-GKRtZ-nRU9q-6mG7X-ymEGT-1ugoM-hM7Kl-wTVkV-RLj4b';

const headers = {
    'Content-Type': 'application/json',
    'ApplicationAccessKey': applicationAccessKey
};

const Properties = {
    "Locale": "pt-BR",
    "Timezone": "UTC"
};

const request_api = async (action, table, row_params) => {
    try {
        const url = `https://api.appsheet.com/api/v2/apps/${appId}/tables/${table}/${action}`;

        const body = {
            "Action": action,
            Properties,
            "Rows": row_params
        };

        const response = await axios.post(url, body, { headers });

        if (!response.data) {
            throw new Error('O servidor do AppSheet não respondeu.');
        };

        return await axios.post(url, body, { headers });

    } catch (err) {
        throw err;
    };
};

export const add_table_row = async (table, row_data) => {
    return await request_api('Add', table, [row_data]);
};

export const delete_table_row = async (table, row_id) => {
    return await request_api('Delete', table, [{ ['Row ID']: row_id }]);
};

export const get_all_table_rows = async (table) => {
    return await request_api('Find', table, []);
};