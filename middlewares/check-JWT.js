const jwt = require('jsonwebtoken');
const User = require('../models/user');


const checkJWT = async (req, res, next) => {

    const token = req.header('token');

    if( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try{

        const { id }= jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(id);

        if(!user || user.active === false){
            return res.status(401).json({
                ok: false,
                msg: "Token no válido"
            });
        }else{
            req.user = user;
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
    checkJWT
}
