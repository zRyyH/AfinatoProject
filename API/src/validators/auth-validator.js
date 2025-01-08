import Joi from 'joi';

// Campos reutilizáveis.
const fields = {
    email: Joi.string()
        .email({ tlds: { allow: true } })
        .required()
        .messages({
            "string.email": "Por favor, insira um email válido.",
            "any.required": "O campo email é obrigatório.",
        }),

    password: Joi.string()
        .min(8)
        .max(128)
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])"))
        .required()
        .messages({
            "string.min": "A senha deve ter pelo menos 8 caracteres.",
            "string.max": "A senha pode ter no máximo 128 caracteres.",
            "string.pattern.base": "A senha deve incluir pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.",
            "any.required": "O campo senha é obrigatório.",
        }),
};

export const authSchema = Joi.object({
    email: fields.email,
    password: fields.password
});