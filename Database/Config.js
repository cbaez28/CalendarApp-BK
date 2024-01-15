const {connect} = require('mongoose')

const dbConection = async () => {
    try {
      await  connect(process.env.DB_CNN,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        console.log('connect success');
    } catch (error) {

        console.log( error)
        throw new Error('Error iniciando DB');
    }
}

module.exports = {
    dbConection
}




