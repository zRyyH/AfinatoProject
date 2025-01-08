import { jwtVerify } from "../utils/jwt-auth.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const payload = jwtVerify(req.headers.authorization?.trim());

        if (payload) {
            res.user = payload;
            next();
        } else {
            throw new Error('Token inválido, faça o login novamente!');
        };
    } catch (err) {
        next(err);
    };
};