const moment = require('moment');


const DateValidator = (value) => {
    if(!value){
        return false;
    }

    const _Date = moment(value);
    if(_Date.isValid()){
        return true;
    }else {
        return false;
    }
}


module.exports = { 
    DateValidator 
}