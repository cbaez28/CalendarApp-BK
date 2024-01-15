


const Jwt = require('jsonwebtoken');

const GenerarJWT = (id, name) => {
    return new Promise( (resolve, reject) => {

        const payload = { id, name};
        Jwt.sign(payload, process.env.JWT_SECRECT_KEY, 
            { 
                expiresIn: '2h'
            }, ( err, token)=> {
                if(err){
                    console.log(err)
                    reject("Error generando token")
                }

                resolve(token)
            })
    })   
}

module.exports = {
    GenerarJWT
}