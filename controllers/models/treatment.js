const Treatment = require('../../models/treatment');
const Pet = require("../../models/pet");

/**
 * Método para conseguir todos los tratamientos.
 */
const getTreatments = async (req,res) =>{

    try{

        const active = req.params.active || true;

        const from = (Number(req.query.page) || 0) * 5;

        const [data , total] = await Promise.all([
            Treatment.find( {active: active})
                .skip( from )
                .limit(5)
                .populate('idPet', 'id name img')
                .populate('idUser', 'id name lastName img')
                .populate('deleteUser', 'id name lastName img'),

            Treatment.countDocuments({active: active})
        ]);

        res.status(200).json({
            ok: true,
            msg: "Listado de tratamientos",
            data,
            total
        });

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

const getAllTreatments = async (req,res) =>{

    try{

        if(req.user.rol === 'USER_ROLE'){
            return res.status(401).json({
                ok: false,
                msg: 'Usuario sin permisos'
            });
        }else{

            await Treatment.find({active: true})
                .populate('idPet', 'id name img')
                .populate('idUser', 'id name lastName img')
                .populate('deleteUser', 'id name lastName img')
                .then(
                    data => {
                        res.status(200).json({
                            ok: true,
                            msg: "Listado de tratamientos",
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
 * Método para conseguir un tratamiento según su id enviada por la url.
 */
const getOneTreatment = async (req,res)=>{

    const id = req.params.id;

    try{

        await Treatment.findById(id)
            .populate('idPet', 'id name img')
            .populate('idUser', 'id name lastName img')
            .populate('deleteUser', 'id name lastName img')
            .then( data => {
            res.status(200).json({
                ok: true,
                msg: "Tratamiento",
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
 * Método para crear un tratamiento según la información pasada en la petición.
 *  - Sin eres usuario no puedes acceder al método.
 *  - Introducimos el usuario que realiza la petición en el tratamiento.
 *  - Introducimos la id en el apartado de tratamientos del animal.
 */
const createTreatment = async (req,res) =>{

    try{

        if(req.user.rol === 'USER_ROLE'){
            return res.status(401).json({
                ok: false,
                msg: 'Usuario sin permisos'
            });
        }

        const treatment = new Treatment({
            idUser: req.user.id,
            ...req.body
        });

        await treatment.save();

        const petParent = await Pet.findById(treatment.idPet);
        petParent.treatment.push(treatment.id);

        await Pet.findByIdAndUpdate(treatment.idPet, petParent);

        res.status(201).json({
            ok: true,
            msg: 'Tratamiento creado',
            data: treatment
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
const updateTreatment = async (req,res) =>{

    if(req.user.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    const id = req.params.id;

    try{

        //Elementos que no se pueden actualizar
        const {deleteDate, deleteUser, deleteReason, ...fields} = req.body;

        const data = fields;
        data.idUser = req.id;

        await Treatment.findByIdAndUpdate(id, data, {new: true})
            .then( data => {
                res.status(201).json({
                    ok: true,
                    msg: 'Tratamiento actualizado',
                    data
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
const deleteTreatment = async (req,res) =>{

    if(req.user.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    const id = req.params.id;

    try{

        const data = await Treatment.findById(id);

        if(!data){
            res.status(404).json({
                ok: false,
                msg: "No se encontró el tratamiento"
            });
        }

        data.active = false;
        data.deleteDate = Date.now();
        data.deleteReason = req.body.reason || 'Sin motivo';
        data.deleteUser = req.user.id;

        const petParent = await Pet.findById(data.idPet);
        const num = petParent.treatment.indexOf(id);
        petParent.treatment.splice(num, 1);
        await Pet.findByIdAndUpdate(data.idPet, petParent);

        await Treatment.findByIdAndUpdate(id, data, {new: true})
            .then( data => {
            res.status(201).json({
                ok: true,
                msg: 'Tratamiento eliminado',
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
    getTreatments,
    getOneTreatment,
    createTreatment,
    updateTreatment,
    getAllTreatments,
    deleteTreatment
}
