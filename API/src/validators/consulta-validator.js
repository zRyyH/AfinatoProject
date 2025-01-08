import Joi from 'joi';

const ERROR_MESSAGES = {
    REQUIRED: 'Este campo é obrigatório.',
    STRING: 'Deve ser uma string válida.',
    DATE: 'Deve ser uma data válida no formato YYYY-MM-DD.',
    STATUS: 'Status inválido. Deve ser "ativo" ou "inativo".',
};

const fields = {
    clientId: Joi.string().required().messages({
        'any.required': `Row ID: ${ERROR_MESSAGES.REQUIRED}`,
        'string.base': `Row ID: ${ERROR_MESSAGES.STRING}`,
    }),
    title: Joi.string().required().messages({
        'any.required': `Row ID: ${ERROR_MESSAGES.REQUIRED}`,
        'string.base': `Row ID: ${ERROR_MESSAGES.STRING}`,
    }),
    type: Joi.string().required().messages({
        'any.required': `Row ID: ${ERROR_MESSAGES.REQUIRED}`,
        'string.base': `Row ID: ${ERROR_MESSAGES.STRING}`,
    }),
    dateStart: Joi.string().required().messages({
        'any.required': `Descrição: ${ERROR_MESSAGES.REQUIRED}`,
        'string.base': `Descrição: ${ERROR_MESSAGES.STRING}`,
    }),
    dateEnd: Joi.string().required().messages({
        'any.required': `User ID: ${ERROR_MESSAGES.REQUIRED}`,
        'string.base': `User ID: ${ERROR_MESSAGES.STRING}`,
    }),
    status: Joi.string()
        .valid('Aberto', 'Atendido', 'Cancelado')
        .required()
        .messages({
            'any.required': `Status: ${ERROR_MESSAGES.REQUIRED}`,
            'any.only': ERROR_MESSAGES.STATUS,
        }),
    clientId: Joi.string().required().messages({
        'any.required': `Cliente: ${ERROR_MESSAGES.REQUIRED}`,
        'string.base': `Cliente: ${ERROR_MESSAGES.STRING}`,
    }),
};

// POST Consulta, payload para criar consulta.
export const createConsultaSchema = Joi.object({
    clientId: fields.clientId,
    title: fields.title,
    dateStart: fields.dateStart,
    dateEnd: fields.dateEnd,
    status: fields.status,
    clientId: fields.clientId,
    type: fields.type
});

// GET Consultas, payload para obter todas as consultas.
export const getAllConsultaSchema = Joi.object()
    .max(0) // Garante que o objeto body não contenha nenhuma propriedade
    .messages({
        "object.base": "O body não deve ser enviado na requisição.",
        "object.max": "O body não deve conter nenhuma propriedade.",
    });