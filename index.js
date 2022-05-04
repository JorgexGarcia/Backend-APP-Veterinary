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
app.use('/api/user', require('./routes/user'));
app.use('/api/queries', require('./routes/queries'));
app.use('/api/promotion', require('./routes/promotion'));
app.use('/api/aids', require('./routes/aids'));
app.use('/api/pet', require('./routes/pet'));
app.use('/api/product', require('./routes/product'));
app.use('/api/service', require('./routes/service'));
app.use('/api/treatment', require('./routes/treatment'));
app.use('/api/breed', require('./routes/breed'));

app.use('/api/login', require('./routes/auth'));

app.use('/api/search', require('./routes/search'));

/*
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname + 'public/index.html'));
});
*/


app.listen(process.env.PORT, () => {
    console.log('Server running in port ' + process.env.PORT)
});
