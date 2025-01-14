import { add_table_row } from '../utils/appsheet-api.js';
import Query from '../models/Query.js';
import { generateNumber } from '../utils/generate.js'
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';

export const createConsultaService = async (body, userId, franchise) => {
    const year = generateNumber(2000, 2050);
    const mounth = generateNumber(1, 12);
    const day = generateNumber(1, 27);

    const payload = { 'Row ID': uuidv4() };

    payload.Descricao = body.client;
    payload.Usuario = userId;
    payload.Data = `${year}/${mounth}/${day}`;
    payload.DataTermino = `${year}/${mounth}/${day + 1}`;
    payload.Observacoes = body.description;
    payload.Status = body.status;
    payload.Cliente = body.clientId;
    payload.Franquia = franchise;

    const data = {
        queryId: payload['Row ID'],
        userId: userId,
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
            type: body.type
        }
    });

    if (eventosEntreDatas.length > 0) {
        throw new Error('Já existe consultas marcadas para esse horário.');
    } else {
        const resultAppSheet = await add_table_row('Consulta', payload);
        if (resultAppSheet) {
            const resultMySql = await Query.create(data);
        }
        return resultAppSheet;
    }
};

export const deleteConsultaService = async (body, userId) => {
    const resultado = await Query.destroy({
        where: {
            id: body.id,
            userId
        }
    });

    if (resultado) {
        return resultado;
    } else {
        throw new Error('Consulta não encontrada!')
    }

};

export const getAllConsultaService = async (userId) => {
    let consultas = await Query.findAll({
        where: {
            dateStart: {
                [Op.gt]: new Date()    // Verifica se a data atual é menor que dateStart
            },
            userId,
        }
    });

    consultas = consultas.map((e) => e.dataValues)

    const payload = {
        data: consultas
    };

    return payload;
};