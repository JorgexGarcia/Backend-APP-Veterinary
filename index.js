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
_ = dbConnection();

//Directorio público
app.use(express.static('public'));


//Rutas
app.use('/api/user', require('./routes/models/user'));
app.use('/api/queries', require('./routes/models/queries'));
app.use('/api/promotion', require('./routes/models/promotion'));
app.use('/api/aids', require('./routes/models/aids'));
app.use('/api/pet', require('./routes/models/pet'));
app.use('/api/product', require('./routes/models/product'));
app.use('/api/service', require('./routes/models/service'));
app.use('/api/treatment', require('./routes/models/treatment'));
app.use('/api/breed', require('./routes/models/breed'));

//Login
app.use('/api/auth', require('./routes/auth/auth'));

//Search
app.use('/api/search', require('./routes/search/search'));

//Archivos
app.use('/api/upload', require('./routes/upload/upload'));



app.listen(process.env.PORT, () => {
    console.log('Server running in port ' + process.env.PORT)
});
