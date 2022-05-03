const jwt = require('jsonwebtoken');
const Usuario = require('../modelos/usuario');


const validarJWT = async (req, res, next) => {

    const token = req.header('token');

    if( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try{

        const { id }= jwt.verify(token, process.env.JWT_SECRET);

        const usuario = await Usuario.findById(id);

        if(!usuario || usuario.active === false){
            return res.status(401).json({
                ok: false,
                msg: "Token no válido"
            });
        }else{
            req.usuario = usuario;
            next();
        }

    }catch (error){
        return res.status(401).json({
            ok: false,
            msg: 'Token no es correcto'
        });
    }

}

module.exports = {
    validarJWT
}
