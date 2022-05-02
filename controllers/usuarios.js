const Usuario = require('../modelos/usuario');
const bcrypt = require('bcryptjs');

/**
 * Método para conseguir todos los usuarios
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getUsuarios = async (req,res) =>{

    try{

        await Usuario.find().then( usuarios => {
            res.status(200).json({
                ok: true,
                msg: "Listado de usuarios",
                usuarios
            })
        });


    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

/**
 * Método para conseguir un usuario según su id enviada por la url
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getOneUsuarios = async (req,res)=>{

    const id = req.params.id;

    try{

        await Usuario.findById(id).then( usuario => {
            res.json({
                ok: true,
                msg: "Usuario",
                usuario
            })
        });

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

/**
 * Método para crear un usuario según la información pasada en la petición.
 *  - Primero compruebo si ya hay un usuario con ese email:
 *      - Si ya tenemos uno , compruebo si esta eliminado:
 *          - Si no esta, indico al forntend que ya hay un asuario con ese email
 *          - Si esta, loo actualizo con la nueva información y lo marco como activo
 *  - Lo mismo con el dni
 *  - Si no esta el dni ni el email en la BD, creo un usuario nuevo.
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const createUsuario = async (req,res) =>{

    const {email, dni, password} = req.body;

    const usuario = new Usuario (req.body);
    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    try{

        const existeEmail = await Usuario.findOne({email});

        if( existeEmail ){

            if(existeEmail.active){
                return res.status(409).json({
                    ok: false,
                    msg: 'El correo ya está registrado'
                });

            }else{
                existeEmail.active = true;
                await Usuario.findOneAndUpdate({email}, existeEmail,{new: true})
                    .then( usuario => {
                        return res.status(201).json({
                            ok: true,
                            msg: 'Usuario activado de nuevo',
                            usuario
                        });
                });
                return;

            }

        }

        const existeDni = await Usuario.findOne({dni});

        if( existeDni ){

            if(existeDni.active){
                return res.status(409).json({
                    ok: false,
                    msg: 'El dni ya está registrado'
                });

            }else{
                await Usuario.findOneAndUpdate({dni}, {usuario},{new: true})
                    .then( usuario => {
                        return res.status(201).json({
                            ok: true,
                            msg: 'Usuario activado de nuevo',
                            usuario
                        });
                    });
                return;
            }

        }

        await usuario.save();

        res.status(201).json({
            ok: true,
            msg: 'Usuario creado',
            usuario
        });

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

/**
 * Método para actualizar un usuario.
 *  - Compruebo si el usuario esta en la BD, sino esta devuelvo un status 404
 *  - Si esta, compruebo que el nuevo email o dni no coincide con ningún otro en la BD
 *  - Si no coincide, actualizo el usuario.
 *  - No se puede actualizar:
 *      - password, auth, email, dni, active, delete_date, delete_user
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const updateUsuario = async (req,res) =>{

    const id = req.params.id;

    try{

        const usuarioDB = await Usuario.findById(id);

        if(!usuarioDB){
            res.status(404).json({
                ok: false,
                msg: "No se encontro el usuario"
            });
        }

        //Elementos que no se pueden actualizar
        const {password, auth, email, dni, active,
            delete_date, delete_user, ...campos} = req.body;

        if(usuarioDB.email !== email){
            const existeEmail = await Usuario.findOne({email : campos.email});

            if( existeEmail ){
                return res.status(409).json({
                    ok: false,
                    msg: 'El correo ya está registrado'
                });
            }
        }
        campos.email = email;

        if( usuarioDB.dni !== dni){
            const existeDni = await Usuario.findOne({dni});

            if( existeDni ){
                return res.status(409).json({
                    ok: false,
                    msg: 'El dni ya está registrado'
                });
            }
        }
        campos.dni = dni;

        await Usuario.findByIdAndUpdate(id, campos, {new: true}).then( usuario => {
           res.status(201).json({
               ok: true,
               msg: 'Usuario actualizado',
               usuario
           })
        });

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }
}

/**
 * Método para eliminar un USUario
 *  - No eliminamos un usuario de la BD, sino que lo marcamos como que no esta activo.
 *  - También añadimos la fecha de la eliminación y quien lo elimino para llevar un control.
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const deleteUsuario = async (req,res) =>{

    const id = req.params.id;

    try{

        const usuarioDB = await Usuario.findById(id);

        if(!usuarioDB){
            res.status(404).json({
                ok: false,
                msg: "No se encontro el usuario"
            });
        }

        usuarioDB.active = false;
        usuarioDB.delete_date = Date.now();
        usuarioDB.delete_reason = req.body.reason || 'Sin motivo';
        //TODO
        usuarioDB.delete_user = id;

        await Usuario.findByIdAndUpdate(id, usuarioDB, {new: true}).then( usuario => {
            res.status(201).json({
                ok: true,
                msg: 'Usuario eliminado',
                usuario
            });
        });

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }
}

module.exports = {
    getUsuarios,
    createUsuario,
    getOneUsuarios,
    deleteUsuario,
    updateUsuario
}