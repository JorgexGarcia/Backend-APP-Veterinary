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
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/consultas', require('./routes/consultas'));
app.use('/api/promociones', require('./routes/promociones'));
app.use('/api/consejos', require('./routes/consejos'));
app.use('/api/animales', require('./routes/pets'));
app.use('/api/productos', require('./routes/productos'));
app.use('/api/servicios', require('./routes/services'));
app.use('/api/tratamientos', require('./routes/tratamientos'));

/*
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname + 'public/index.html'));
});
*/


app.listen(process.env.PORT, () => {
    console.log('Server running in port ' + process.env.PORT)
});
