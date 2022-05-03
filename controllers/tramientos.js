const Tratamiento = require('../modelos/tratamiento');
const Pet = require("../modelos/pet");

/**
 * Método para conseguir todos los tratamientos.
 */
const getTratamientos = async (req,res) =>{

    try{

        await Tratamiento.find()
            .populate(['id_pet', 'id_user', 'delete_user'])
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
            .populate(['id_pet', 'id_user', 'delete_user'])
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
 *  - Introducimos la id en el apartado de tratamientos del animal.
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

        const petParent = await Pet.findById(tratamiento.id_pet);
        petParent.treatment.push(tratamiento.id);

        await Pet.findByIdAndUpdate(tratamiento.id_pet, petParent);

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
 *  - No eliminamos el tratamiento, la marcamos como no activa, guardamos la fecha,
 *      motivo y usuario que la desea eliminar.
 *  - Eliminamos el tratamiento del animal
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

        const data = await Tratamiento.findById(id);

        if(!data){
            res.status(404).json({
                ok: false,
                msg: "No se encontro el tratamiento"
            });
        }

        data.active = false;
        data.delete_date = Date.now();
        data.delete_reason = req.body.reason || 'Sin motivo';
        data.delete_user = req.usuario.id;

        const petParent = await Pet.findById(data.id_pet);
        const num = petParent.treatment.indexOf(id);
        petParent.treatment.splice(num, 1);
        await Pet.findByIdAndUpdate(data.id_pet, petParent);

        await Tratamiento.findByIdAndUpdate(id, data, {new: true})
            .then( tratamiento => {
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
