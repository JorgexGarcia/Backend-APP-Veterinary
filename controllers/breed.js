const Breed = require('../models/breed');

/**
 * Método para obtener el listado de razas.
 *  - Si eres Usuario no puedes acceder al método.
 */
const getBreeds = async (req,res) =>{

    try{

        if(req.user.rol === 'USER_ROLE'){
            return res.status(401).json({
                ok: false,
                msg: 'Usuario sin permisos'
            });
        }

        await Breed.find()
            .populate('deleteUser')
            .then( data => {
            res.status(200).json({
                ok: true,
                msg: "Listado de razas",
                data
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
 * Método para obtener una raza.
 *  - Si eres Usuario no puedes acceder al método.
 */
const getOneBreed = async (req,res)=>{

    if(req.user.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    const id = req.params.id;

    try{

        await Breed.findById(id)
            .populate('deleteUser')
            .then( data => {
            res.status(200).json({
                ok: true,
                msg: "Raza",
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

/**
 * Método para crear una raza.
 *  - Si eres Usuario no puedes acceder al método.
 */
const createBreed = async (req,res) =>{

    try{

        if(req.user.rol === 'USER_ROLE'){
            return res.status(401).json({
                ok: false,
                msg: 'Usuario sin permisos'
            });
        }

        const breed = new Breed(req.body);

        await breed.save();

        res.status(201).json({
            ok: true,
            msg: 'Raza creada',
            data: breed
        })

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

/**
 * Método para actualizar una raza.
 *  - Si eres Usuario no puedes acceder al método.
 */
const updateBreed = async (req,res) =>{

    if(req.user.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    const id = req.params.id;

    try{

        //Elementos que no se pueden actualizar
        const {active, deleteDate, deleteUser, deleteReason, ...fields} = req.body;

        await Breed.findByIdAndUpdate(id, fields, {new: true})
            .then( data => {
                res.status(201).json({
                    ok: true,
                    msg: 'Raza actualizada',
                    data
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
 * Método para borrar una raza.
 *  - Si eres Usuario no puedes acceder al método.
 *  - No eliminamos la raza, lo marcamos como no activo, guardamos la fecha,
 *      el motivo y el usuario que lo desea eliminar
 */
const deleteBreed = async (req,res) =>{

    if(req.user.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    const id = req.params.id;

    try{

        const data = await Breed.findById(id);

        if(!data){
            res.status(404).json({
                ok: false,
                msg: "No se encontró la raza"
            });
        }

        data.active = false;
        data.deleteDate = Date.now();
        data.deleteReason = req.body.reason || 'Sin motivo';
        data.deleteUser = req.user.id;

        await Breed.findByIdAndUpdate(id, data, {new: true})
            .then( data => {
            res.status(201).json({
                ok: true,
                msg: 'Raza eliminada',
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
    getBreeds,
    getOneBreed,
    createBreed,
    updateBreed,
    deleteBreed
}
