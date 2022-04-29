const Usuario = require('../modelos/usuario');

const getUsuarios = async (req,res) =>{

    await Usuario.find().then( data => {
            res.json({
                ok: true,
                usuario: data
            })
    }).catch(error => {
            console.log('error');
        res.json({
            ok: false,
            error
        })
    });

}

const createUsuario = async (req,res) =>{

    const {email} = req.body;

    const usuario = new Usuario (req.body);

    await usuario.save();

    res.json({
        ok: true,
        usuario
    })

}

module.exports = {
    getUsuarios,
    createUsuario
}
