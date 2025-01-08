import { jwtSign } from '../utils/jwt-auth.js';
import User from '../models/User.js';

export const authService = async (body) => {
    const email = body.email;
    const password = body.password;

    const user = await User.findOne({
        where: {
            email: email,
            password: password
        }
    });

    if (!user) {
        throw new Error('Não autorizado!');
    }

    const payload = {
        userId: user.dataValues.userId,
        name: user.dataValues.name,
        email: user.dataValues.email,
        franchise: user.dataValues.franchise
    };

    return { token: jwtSign(payload, user.dataValues.id), name: user.dataValues.name };
};