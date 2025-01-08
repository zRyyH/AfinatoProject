import { add_table_row } from '../utils/appsheet-api.js';
import Query from '../models/Query.js';
import { generateNumber } from '../utils/generate.js'
import { v4 as uuidv4 } from 'uuid';

export const createConsultaService = async (body, userId, franchise) => {
    const year = generateNumber(0, 10000);
    const mounth = generateNumber(1, 12);
    const day = generateNumber(1, 27);

    const payload = { 'Row ID': uuidv4() };

    payload.Descricao = body.title;
    payload.Usuario = userId;
    payload.Data = `${year}/${mounth}/${day}`;
    payload.DataTermino = `${year}/${mounth}/${day + 1}`;
    payload.Observacoes = body.title;
    payload.Status = body.status;
    payload.Cliente = body.clientId;
    payload.Franquia = franchise;

    const data = {
        queryId: payload['Row ID'],
        userId: userId,
        clientId: body.clientId,
        title: body.title,
        dateStart: body.dateStart,
        dateEnd: body.dateEnd,
        status: body.status,
        type: body.type
    };

    const resultAppSheet = await add_table_row('Consulta', payload);
    const resultMySql = await Query.create(data);

    return resultAppSheet;
};

export const getAllConsultaService = async (userId) => {
    let consultas = await Query.findAll();
    consultas = consultas.map((e) => e.dataValues).filter(e => e.userId === userId);

    const payload = {
        data: consultas
    };

    return payload;
};