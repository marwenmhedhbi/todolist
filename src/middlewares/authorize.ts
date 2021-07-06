import expressJwt from 'express-jwt';

const secret = process.env.SECRET_KEY;

export const Jwt = expressJwt({
    algorithms: ['HS256'],
    secret: secret
});