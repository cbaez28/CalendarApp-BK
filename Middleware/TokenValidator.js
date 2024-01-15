
const {response} = require('express');
const Jwt = require('jsonwebtoken');


const JwtValidator = (req, resp = response, next) => {

    const token = req.header('x-token');
    if(!token){
        return resp.status(401).json({
            ok: false,
            msg: 'El usuario no es autenticado'
        });
    }

    try {
        const {id, name} = Jwt.verify(token, process.env.JWT_SECRECT_KEY);

        req.id = id
        req.name = name

    } catch (error) {
        return resp.status(401).json({
            ok: false,
            msg: 'El usuario no es autenticado'
        });
    }

    next();
}

module.exports = {
    JwtValidator
}