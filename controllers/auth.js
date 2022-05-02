const Usuario = require('../modelos/usuario');
const bcrypt = require('bcryptjs');
const {generarJWT} = require("../helpers/jwt");

const login = async (req,res) =>{

    const {email, password} = req.body;

    try{

        const usuarioDB = await Usuario.findOne({email});

        if(!usuarioDB) {
            res.status(404).json({
                ok: false,
                msg: "1 : Constraseña no válida"
            });
        }

        //Comprobar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if(!validPassword){
            res.status(404).json({
                ok: false,
                msg: "11 : Constraseña no válida"
            });
        }

        //Generar token
        const token = await generarJWT(usuarioDB.id);

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

module.exports = {
    login
}
