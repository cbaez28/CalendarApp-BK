const {response} = require('express');
const bcrypt = require('bcryptjs')
const User = require('../Models/Usuario');
const { GenerarJWT } = require('../Helpers/Jwt');

const crearUsuario = async (req, resp = response) => {

    try 
    {
        const {  email } = req.body;
        let user = await User.findOne({ email });
        if(user){
            return  resp.status(400).
                        json({
                            ok: false,
                            msg: 'El ya se encuentra registrado'
                        })
            
        }

        user = new User(req.body);
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);

        await user.save();
        const token = await GenerarJWT(user.id, user.name);


        resp.status(201).
        json({
            ok: true,
            msg:'Crear',
            id: user.id,
            token
        });

    } catch (error) {

        console.log(error);
        resp.status(500).
        json({
            ok: false,
            msg:'Error creando usuario.'
        })
        
    }
  
}

const loginUsuario = async (req, resp = response) => {

    try {
        const {  email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user){
            return  resp.status(400).
                        json({
                            ok: false,
                            msg: 'Email invalido'
                        })
            
        }

        const validPassword = bcrypt.compareSync( password, user.password);
        if(!validPassword){
            return  resp.status(400).
                        json({
                            ok: false,
                            msg: 'Password invalido'
                        })
            
        }

        const token = await GenerarJWT(user.id, user.name);

        resp.json({
            ok: true,
            msg: user.name,
            token
        })

    } catch (error) {
        console.log(error);
        resp.status(500).
        json({
            ok: false,
            msg:'Error haciendo login.'
        })
   }
}

const revalidarToken = async (req, resp = response) => {

    const token = await GenerarJWT(req.id, req.name);

    resp.json({
        ok: true,
        msg: 'renew',
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}