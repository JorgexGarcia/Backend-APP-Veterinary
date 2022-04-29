const express = require('express');
const { dbConnection } = require('./database/config');
require ('dotenv').config();
const cors = require('cors');

//Crear el servidor Express
const app = express();

//Configurar CORS
app.use(cors());

//Lectura del body
app.use(express.json());

//Base de datos
dbConnection();

//Directorio publico
app.use(express.static('public'));


//Rutas
//app.use('/api/usuarios', require(''));
//app.use('/api/login', require('./routes/auth'));
//app.use('/api/hospitales', require('./routes/hospitales'));
//app.use('/api/medicos', require('./routes/medicos'));
//app.use('/api/to do', require('./routes/busquedas'));
//app.use('/api/upload', require('./routes/uploads'));

/*
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname + 'public/index.html'));
});
*/


app.listen(process.env.PORT, () => {
    console.log('Server running in port ' + process.env.PORT)
});
