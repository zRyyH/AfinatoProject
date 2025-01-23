import { add_table_row, edit_table_row } from '../utils/appsheet-api.js';
import Query from '../models/Query.js';
import { generateNumber } from '../utils/generate.js'
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';


export const createConsultaService = async (body, user) => {
    const year = generateNumber(2000, 2050);
    const mounth = generateNumber(1, 12);
    const day = generateNumber(1, 27);

    const payload = { 'Row ID': uuidv4() };

    payload.Descricao = body.client;
    payload.Usuario = user.userId;
    payload.Data = `${year}/${mounth}/${day}`;
    payload.DataTermino = `${year}/${mounth}/${day + 1}`;
    payload.Observacoes = body.description;
    payload.Status = body.status;
    payload.Cliente = body.clientId;
    payload.Franquia = user.franchise;

    const data = {
        queryId: payload['Row ID'],
        userId: user.userId,
        clientId: body.clientId,
        client: body.client,
        description: body.description,
        dateStart: body.dateStart,
        dateEnd: body.dateEnd,
        status: body.status,
        type: body.type
    };

    const eventosEntreDatas = await Query.findAll({
        where: {
            dateEnd: {
                [Op.gt]: new Date(body.dateStart)  // Verifica se dateStart é maior que dateEnd
            },
            dateStart: {
                [Op.lt]: new Date(body.dateEnd)    // Verifica se dateEnd é menor que dateStart
            },
            type: body.type,
            userId: user.userId
        }
    });

    if (eventosEntreDatas.length > 0) {
        throw new Error('Já existe consultas marcadas para esse horário.');
    } else {
        const resultAppSheet = await add_table_row('Consulta', payload, user.appId, user.accessKey);
        if (resultAppSheet) {
            await Query.create(data);
        }
        return resultAppSheet;
    }
};


export const deleteConsultaService = async (body, user) => {
    console.log(body, user);
    
    const resultado = await Query.destroy({
        where: {
            userId: user.userId,
            queryId: body.queryId
        }
    });

    if (resultado) {
        return resultado;
    } else {
        throw new Error('Consulta não encontrada!');
    }
};


export const editConsultaService = async (body, user) => {
    const payload_appsheet = {
        "Row ID": body.queryId,
        "Descricao": body.client,
        "Observacoes": body.description,
        "Data": body.dateStart,
        "DataTermino": body.dateEnd,
        "Status": body.status
    };

    const payload_db = {
        description: body.client,
        dateStart: body.dateStart,
        dateEnd: body.dateEnd,
        status: body.status
    };

    const result_appsheet = await edit_table_row('Consulta', payload_appsheet, user.appId, user.accessKey);
    const result_banco = await Query.update(payload_db, {
        where: {
            queryId: body.queryId,
            userId: user.userId
        }
    });

    return { result_appsheet, result_banco };
};


export const getAllConsultaService = async (user) => {
    let consultas = await Query.findAll({
        where: {
            userid: user.userId,
        }
    });

    consultas = consultas.map((e) => e.dataValues);

    const payload = {
        data: consultas
    };

    return payload;
};