import Joi from 'joi';

const ERROR_MESSAGES = {
    REQUIRED: 'Este campo é obrigatório.',
    STRING: 'Deve ser uma string válida.'
};

const ERROR_STRING = {
    'any.required': `Row ID: ${ERROR_MESSAGES.REQUIRED}`,
    'string.base': `Row ID: ${ERROR_MESSAGES.STRING}`
};

const fields = {
    queryId: Joi.string().messages(ERROR_STRING),
    clientId: Joi.string().messages(ERROR_STRING),
    client: Joi.string().messages(ERROR_STRING),
    description: Joi.string().messages(ERROR_STRING),
    type: Joi.string().valid('Avaliação', 'Nutrição', 'Estética 1', 'Estética 2', 'Estética 3', 'Estética 4').messages(ERROR_STRING),
    dateStart: Joi.string().messages(ERROR_STRING),
    dateEnd: Joi.string().messages(ERROR_STRING),
    status: Joi.string().valid('Aberto', 'Atendido', 'Cancelado').messages(ERROR_STRING)
};

// POST Consulta, payload para criar consulta.
export const createConsultaSchema = Joi.object({
    clientId: fields.clientId.required(),
    client: fields.client.required(),
    description: fields.description.required(),
    dateStart: fields.dateStart.required(),
    dateEnd: fields.dateEnd.required(),
    status: fields.status.required(),
    type: fields.type.required()
});

// EDIT Consulta, payload para criar consulta.
export const editConsultaSchema = Joi.object({
    queryId: fields.queryId.optional(),
    clientId: fields.clientId.optional(),
    client: fields.client.optional(),
    description: fields.description.optional(),
    dateStart: fields.dateStart.optional(),
    dateEnd: fields.dateEnd.optional(),
    status: fields.status.optional(),
    type: fields.type.optional()
});

// GET Consultas, payload para obter todas as consultas.
export const getAllConsultaSchema = Joi.object()
    .max(0) // Garante que o objeto body não contenha nenhuma propriedade
    .messages({
        "object.base": "O body não deve ser enviado na requisição.",
        "object.max": "O body não deve conter nenhuma propriedade.",
    });

// DELETE Consulta, payload para criar consulta.
export const deleteConsultaSchema = Joi.object({
    queryId: fields.queryId.optional()
});