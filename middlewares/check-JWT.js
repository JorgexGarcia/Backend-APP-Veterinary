const jwt = require('jsonwebtoken');
const User = require('../models/user');


const checkJWT = async (req, res, next) => {

    const token = req.header('token');

    if( !token ){
        console.log(3)
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try{

        const { id }= jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(id);

        if(!user || user.active === false){
            console.log(2)
            return res.status(401).json({
                ok: false,
                msg: "Token no válido"
            });
        }else{
            req.user = user;
            next();
        }

    }catch (error){
        console.log(error)
        return res.status(401).json({
            ok: false,
            msg: 'Token no es correcto'
        });
    }

}

module.exports = {
    checkJWT
}
