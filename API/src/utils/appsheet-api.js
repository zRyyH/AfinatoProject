import axios from 'axios';

const appId = '789ddc9d-7dfc-4d80-b71f-3703a9fa5f3e';
const applicationAccessKey = 'V2-tyq1Y-gybHq-sr3tg-WL8Ao-kdIcq-6u3ew-MNefh-P5W51';

const headers = {
    'Content-Type': 'application/json',
    'ApplicationAccessKey': applicationAccessKey
};

const Properties = {
    "Locale": "pt-BR"
};

const request_api = async (action, table, row_params) => {
    try {
        const url = `https://api.appsheet.com/api/v2/apps/${appId}/tables/${table}/${action}`;

        const body = {
            "Action": action,
            Properties,
            "Rows": row_params
        };

        try {
            const response = await axios.post(url, body, { headers });
    
            if (!response.data) {
                throw new Error('O servidor do AppSheet não respondeu.');
            };

        } catch (e) {
            console.log(e);
        }

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