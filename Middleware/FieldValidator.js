const {response} = require('express')
const {validationResult} = require('express-validator')

const FieldValidator = (req, resp = response, next) => {
    
   const error = validationResult(req);
   if(!error.isEmpty()){
       return resp.status(400).json({
           ok: false,
           error: error.mapped()
       })
   }

   next();

}

module.exports = FieldValidator