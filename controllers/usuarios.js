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

const getOneUsuarios = async (req,res)=>{

    const id = req.params.id;

    await Usuario.findById(id).then( data => {
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

    const {email, dni} = req.body;

    try{

        const existeEmail = await Usuario.findOne({email});

        if( existeEmail ){
            return res.status(409).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const existeDni = await Usuario.findOne({dni});

        if( existeDni ){
            return res.status(409).json({
                ok: false,
                msg: 'El dni ya está registrado'
            });
        }

        const usuario = new Usuario (req.body);

        await usuario.save();

        res.status(201).json({
            ok: true,
            msg: 'Usuario creado',
            usuario
        })

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

const updateUsuario = async (req,res) =>{

    const id = req.params.id;

    const usuario = await Usuario.findByIdAndUpdate(id, req.body, {new: true});

    res.json({
        ok: true,
        usuario
    })
}

const deleteUsuario = async (req,res) =>{

    const id = req.params.id;

    const usuario = await Usuario.findByIdAndDelete(id);

    res.json({
        ok: true,
        usuario
    })
}

module.exports = {
    getUsuarios,
    createUsuario,
    getOneUsuarios,
    deleteUsuario,
    updateUsuario
}
