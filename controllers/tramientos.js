const Tratamiento = require('../modelos/tratamiento');

/**
 * Método para conseguir todos los tratamientos.
 */
const getTratamientos = async (req,res) =>{

    try{

        await Tratamiento.find()
            .populate(['id_pet', 'id_user'])
            .then( tratamientos => {
            res.status(200).json({
                ok: true,
                msg: "Listado de tratamientos",
                tratamientos
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
 * Método para conseguir un tratamiento según su id enviada por la url.
 */
const getOneTratamiento = async (req,res)=>{

    const id = req.params.id;

    try{

        await Tratamiento.findById(id)
            .populate(['id_pet', 'id_user'])
            .then( tratamiento => {
            res.status(200).json({
                ok: true,
                msg: "Tratamiento",
                tratamiento
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
 * Método para crear un tratamiento según la información pasada en la petición.
 *  - Sin eres usuario no puedes acceder al método.
 *  - Introducimos el usuario que realiza la petición en el tratamiento.
 */
const createTratamiento = async (req,res) =>{

    try{

        if(req.usuario.rol === 'USER_ROLE'){
            return res.status(401).json({
                ok: false,
                msg: 'Usuario sin permisos'
            });
        }

        const tratamiento = new Tratamiento ({
            id_user: req.usuario.id,
            ...req.body
        });

        await tratamiento.save();

        res.status(201).json({
            ok: true,
            msg: 'Tratamiento creado',
            tratamiento
        })

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

/**
 * Método para actualizar un tratamiento.
 *  - Sin eres usuario no puedes acceder al método.
 *  - Introducimos el usuario que realiza la petición en el tratamiento.
 */
const updateTratamiento = async (req,res) =>{

    if(req.usuario.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    const id = req.params.id;

    try{

        const data = req.body;
        data.id_user = req.id;

        await Tratamiento.findByIdAndUpdate(id, data, {new: true})
            .then( tratamiento => {
                res.status(201).json({
                    ok: true,
                    msg: 'Tratamiento actualizado',
                    tratamiento
                })
            });

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador",
            error
        });
    }
}

/**
 * Método para borrar un usuario.
 *  - Sin eres usuario no puedes acceder al método.
 */
const deleteTratamiento = async (req,res) =>{

    if(req.usuario.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    const id = req.params.id;

    try{

        await Tratamiento.findByIdAndDelete(id).then( tratamiento => {
            res.status(201).json({
                ok: true,
                msg: 'Tratamiento eliminado',
                tratamiento
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
    getTratamientos,
    getOneTratamiento,
    createTratamiento,
    updateTratamiento,
    deleteTratamiento
}
