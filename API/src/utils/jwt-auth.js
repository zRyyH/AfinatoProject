import jwt from 'jsonwebtoken';

const secretKey = 'f1949fa193f076342bd80856c510c95c1911d4214917e9e4b339c08cfb1d1dc8';

export function jwtSign(payload, id) {
    try {
        const options = {
            algorithm: "HS256",
            expiresIn: "1h",
            audience: "Afinato",
            issuer: "Afinato API",
            subject: String(id),
        };

        return jwt.sign(payload, secretKey, options);
    } catch (err) {
        err.status = 500
        throw err
    };
};

export function jwtVerify(token) {
    try {
        console.log(token)
        return jwt.verify(token.split(' ')[1], secretKey);
    } catch (err) {
        err.status = 401
        throw new Error('Problema ao verificar o token.')
    };
};