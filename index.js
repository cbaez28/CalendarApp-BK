const express = require('express');
const {dbConection} = require('./Database/Config')
require('dotenv').config();


//Crenando server
const app = express();

dbConection();

//Escuchando peticiones 
app.listen( process.env.PORT, () => {
    console.log(`Server corriendo ${ process.env.PORT }`);
})


//Middleware
app.use(express.json());
app.use(express.static('Public'));
app.use('/api/auth/', require('./Router/Auth'));
app.use('/api/event/', require('./Router/Event'));


