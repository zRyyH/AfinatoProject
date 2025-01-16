export const validationMiddleware = (schema, property = 'body') => {
    return (req, res, next) => {
        try {
            const dataToValidate = req[property];

            const { error, value } = schema.validate(dataToValidate, {
                abortEarly: false,
                allowUnknown: false,
                stripUnknown: true,
            });

            if (error) {
                const errors = error.details.map((detail) => ({
                    field: detail.path.join('.'),
                    message: detail.message,
                }));

                return res.status(400).json({
                    success: false,
                    message: 'Formato de dados inválido',
                    errors,
                });
            };

            req[property] = value;

            next();
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Erro de validação',
                details: err.message,
            });
        };
    };
};