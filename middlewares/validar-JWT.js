const {} = require();


const validarJWT = (req, res, next) => {

    const token = req.header('token');

    

    next();

}

module.exports = {
    validarJWT
}
