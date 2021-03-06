const User = require('../../models/user');
const bcrypt = require('bcryptjs');

/**
 * Método para conseguir todos los usuarios.
 *  - Sin eres usuario no puedes acceder al método
 */
const getUsers = async (req,res) =>{

    try{

        const active = req.params.active || true;

        if(req.user.rol === 'USER_ROLE'){
            return res.status(401).json({
                ok: false,
                msg: 'Usuario sin permisos'
            });
        }else{

            const from = (Number(req.query.page) || 0) * 5;

            const [data , total] = await Promise.all([
                User.find({active: active})
                    .skip( from )
                    .limit(5)
                    .populate('listPets', 'name img' )
                    .populate('promotions', 'name img')
                    .populate('deleteUser', 'name lastName img'),

                User.countDocuments({active: active})
            ]);

            res.status(200).json({
                ok: true,
                msg: "Listado de usuarios",
                data,
                total
            });
        }

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

/**
 * Método para obtener el listado de los usuarios sin paginación.
 */
const getAllUsers = async (req,res) =>{

    try{

        if(req.user.rol === 'USER_ROLE'){
            return res.status(401).json({
                ok: false,
                msg: 'Usuario sin permisos'
            });
        }else{

            await User.find({active: true})
                .populate('listPets', 'name img' )
                .populate('promotions', 'name img')
                .populate('deleteUser', 'name lastName img').then(
                    data => {
                        res.status(200).json({
                            ok: true,
                            msg: "Listado de usuarios",
                            data
                        })
                    }
                ).catch(err => {
                    res.status(400).json({
                        ok: true,
                        msg: err
                    })
                });
        }

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

/**
 * Método para conseguir un usuario según su id enviada por la url.
 *  - Sin eres usuario no puedes acceder al método a no ser que seas tu mismo.
 */
const getOneUser = async (req,res)=>{

    const id = req.params.id;

    try{

        if(req.user.rol === 'USER_ROLE' && req.user.id !== id){
            return res.status(401).json({
                ok: false,
                msg: 'Usuario sin permisos'
            });
        }else{
            await User.findById(id)
                .populate('listPets', 'name img' )
                .populate('promotions', 'name img')
                .populate('deleteUser', 'name lastName img')
                .then( data => {
                res.status(200).json({
                    ok: true,
                    msg: "Usuario",
                    data
                })
            });
        }

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado..., llame a su administrador"
        });
    }

}

/**
 * Método para crear un usuario según la información pasada en la petición.
 *  - Si no eres usuario no puedes acceder al método
 *  - Primero compruebo si ya hay un usuario con ese email:
 *      - Si ya tenemos uno, compruebo si está eliminado:
 *          - Si no esta, indico que hay un usuario con ese email
 *          - Si esta, lo actualizo con la nueva información y lo marco como activo
 *  - Lo mismo con el dni
 *  - Si no está el dni ni el email en la BD, se genera un usuario nuevo.
 */
const createUser = async (req,res) =>{

    if(req.user.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    const {email, dni, password, img} = req.body;

    const user = new User (req.body);
    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    //Imagen por defecto
    if(!img){
        user.img = {
            imgId: 'Null',
            url: 'https://res.cloudinary.com/app-veterinary/image/upload/v1651750377/no-img-user.jpg'
        }
    }

    try{

        const checkEmail = await User.findOne({email});

        if( checkEmail ){

            if(checkEmail.active){
                return res.status(409).json({
                    ok: false,
                    msg: 'El correo ya está registrado'
                });

            }else{
                checkEmail.active = true;
                await User.findOneAndUpdate({email}, checkEmail,{new: true})
                    .then( data => {
                        return res.status(201).json({
                            ok: true,
                            msg: 'Usuario activado de nuevo',
                            data
                        });
                });
                return;

            }

        }

        const checkDni = await User.findOne({dni});

        if( checkDni ){

            if(checkDni.active){
                return res.status(409).json({
                    ok: false,
                    msg: 'El dni ya está registrado'
                });

            }else{
                checkDni.active = true
                await User.findOneAndUpdate({dni}, checkDni,{new: true})
                    .then( data => {
                        return res.status(201).json({
                            ok: true,
                            msg: 'Usuario activado de nuevo',
                            data
                        });
                    });
                return;
            }

        }

        await user.save();

        res.status(200).json({
            ok: true,
            msg: 'Usuario creado',
            data: user
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
 *  - Si eres usuario no puedes acceder al método a no ser que seas tu mismo.
 *  - Compruebo si el usuario está en la BD, si no esta devuelvo un status 404
 *  - Si esta, compruebo que el nuevo email o dni no coincide con ningún otro en la BD
 *  - Si no coincide, actualizo el usuario.
 */
const updateUser = async (req,res) =>{

    const id = req.params.id;

    try{

        if(req.user.rol === 'USER_ROLE' && req.user.id !== id){
            return res.status(401).json({
                ok: false,
                msg: 'Usuario sin permisos'
            });
        }

        const userDB = await User.findById(id);

        if(!userDB){
            res.status(404).json({
                ok: false,
                msg: "No se encontró el usuario"
            });
        }

        //Elementos que no se pueden actualizar
        const {email, dni, active,
            deleteDate, deleteUser, deleteReason, ...fields} = req.body;


        if(userDB.email !== email){
            const checkEmail = await User.findOne({email});

            if( checkEmail ){
                return res.status(409).json({
                    ok: false,
                    msg: 'El correo ya está registrado'
                });
            }
        }
        fields.email = email;

        if( userDB.dni !== dni){
            const checkDni = await User.findOne({dni});

            if( checkDni ){
                return res.status(409).json({
                    ok: false,
                    msg: 'El dni ya está registrado'
                });
            }
        }
        fields.dni = dni;

        //Encriptar contraseña
        if(fields.password){
            const salt = bcrypt.genSaltSync();
            fields.password = bcrypt.hashSync(fields.password, salt);
        }

        await User.findByIdAndUpdate(id, fields, {new: true}).then(data => {
           res.status(201).json({
               ok: true,
               msg: 'Usuario actualizado',
               data,
               password: data.password
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
 * Método para eliminar un Usuario.
 *  - Si no eres usuario no puedes acceder al método
 *  - No eliminamos un usuario de la BD, sino que lo marcamos como que no está activo.
 *  - También añadimos la fecha de la eliminación y quien lo elimino para llevar un control.
 */
const deleteUser = async (req,res) =>{

    if(req.user.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    const id = req.params.id;

    try{

        const userDB = await User.findById(id);

        if(!userDB){
            res.status(404).json({
                ok: false,
                msg: "No se encontró el usuario"
            });
        }

        userDB.active = false;
        userDB.deleteDate = Date.now();
        userDB.deleteReason = req.body.reason || 'Sin motivo';
        userDB.deleteUser = req.user.id;

        await User.findByIdAndUpdate(id, userDB, {new: true})
            .then( data => {
            res.status(201).json({
                ok: true,
                msg: 'Usuario eliminado',
                data
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
    getUsers,
    getOneUser,
    createUser,
    deleteUser,
    updateUser,
    getAllUsers
}
