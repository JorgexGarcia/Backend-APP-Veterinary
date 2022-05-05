const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const {generateJWT} = require("../../helpers/jwt");

const login = async (req,res) =>{

    const {email, password} = req.body;

    try{

        const userDB = await User.findOne({email});

        if(!userDB) {
            res.status(404).json({
                ok: false,
                msg: "Contraseña no válida"
            });
        }

        //Comprobar contraseña
        const validPassword = bcrypt.compareSync(password, userDB.password);

        if(!validPassword){
            res.status(404).json({
                ok: false,
                msg: "Contraseña no válida"
            });
        }

        //Generar token
        const token = await generateJWT(userDB.id);

        res.status(200).json({
            ok: true,
            token
        });


    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

const renewToken = async (req, res) => {

    //Generar token
    const token = await generateJWT(req.user.id);

    res.status(200).json({
        ok: true,
        token
    });
}

module.exports = {
    login,
    renewToken
}
