const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const {generateJWT} = require("../../helpers/jwt");

const login = async (req,res) =>{

    try{
        const {email, password} = req.body;

        const userDB = await User.findOne({email});

        if(!userDB) {
            return res.status(404).json({
                ok: false,
                msg: "Email no encontrado"
            });
        }

        //Comprobar contraseña
        const validPassword = bcrypt.compareSync(password, userDB.password);

        if(!validPassword){
            return res.status(404).json({
                ok: false,
                msg: "Contraseña no válida"
            });
        }

        //Generar token
        const token = await generateJWT(userDB.id);

        const go =  (userDB.rol !== 'USER_ROLE');

        return res.status(200).json({
            ok: true,
            token,
            go
        });


    }catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

const renewToken = async (req, res) => {

    //Generar token
    const token = await generateJWT(req.user.id);

    return res.status(200).json({
        ok: true,
        token,
        data: req.user,
        password: req.user.password
    });
}

module.exports = {
    login,
    renewToken
}
