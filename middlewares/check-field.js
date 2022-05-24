const {validationResult} = require("express-validator");

/**
 * Método que comprueba si la petición le faltan atos y por lo tanto tiene algun error
 */
const checkField = (req, res, next) => {

    const errors = validationResult( req );

    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            msg: errors.mapped()
        });
    }

    next();

}

module.exports = {
    checkField
}
