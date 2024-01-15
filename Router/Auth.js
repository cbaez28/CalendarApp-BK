/*
   Rutas Usuarios / Auth
   host + /api/auth/
*/

const { Router } = require('express');
const _Router = Router();
const {check} = require('express-validator');

const FieldValidator = require('../Middleware/FieldValidator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../Controllers/Auth')
const {JwtValidator} = require('../Middleware/TokenValidator');

///POST
_Router.post('/new', 
 [
    check('name', 'El Nombre es obligatorio').not().isEmpty(),
    check('email', 'El Email es obligatorio').not().isEmpty(),
    check('email', 'El email es invalido').isEmail(),
    check('password', 'El Passwork es obligatorio').not().isEmpty(),
    check('password', 'EL Password tiene que tener un minimo de 6 caracteres').isLength( { min: 6}),
    FieldValidator

 ],
 crearUsuario);
_Router.post('/', 
[
    check('email', 'El Email es obligatorio').not().isEmpty(),
    check('email', 'El email es invalido').isEmail(),
    check('password', 'El Passwork es obligatorio').not().isEmpty(),
    FieldValidator

],
loginUsuario)
_Router.get('/renew', JwtValidator, revalidarToken)




module.exports = _Router;