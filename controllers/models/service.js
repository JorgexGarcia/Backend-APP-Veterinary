const Service = require('../../models/service');

/**
 * Método para conseguir todos los servicios.
 */
const getServices = async (req,res) =>{

    try{
        const active = req.params.active || true;

        const from = (Number(req.query.page) || 0) * 5;

        const [data , total] = await Promise.all([
            Service.find({active: active})
                .skip( from )
                .limit(5)
                .populate('deleteUser', 'name lastName img'),

            Service.countDocuments({active: active})
        ]);

        res.status(200).json({
            ok: true,
            msg: "Listado de servicios",
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

/**
 * Método para conseguir todos los servicios sin paginación
 */
const getAllServices = async (req,res) =>{

    try{

        await Service.find()
            .populate('deleteUser', 'name lastName img').then(
                data => {
                    res.status(200).json({
                        ok: true,
                        msg: "Listado de servicios",
                        data
                    })
                }
            ).catch(err => {
                res.status(400).json({
                    ok: true,
                    msg: err
                })
            })



    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado..., llame a su administrador"
        });
    }

}

/**
 * Método para conseguir un servicio.
 */
const getOneService = async (req,res)=>{

    const id = req.params.id;

    try{

        await Service.findById(id)
            .populate('deleteUser', 'name lastName img')
            .then( data => {
            res.status(200).json({
                ok: true,
                msg: "Servicio",
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
 * Método para crear un servicio según la información pasada en la petición.
 *  - Si no eres usuario no puedes acceder al método.
 */
const createService = async (req,res) =>{

    try{

        if(req.user.rol === 'USER_ROLE'){
            return res.status(401).json({
                ok: false,
                msg: 'Usuario sin permisos'
            });
        }

        const service = new Service (req.body);

        await service.save();

        res.status(200).json({
            ok: true,
            msg: 'Servicio creado',
            data: service
        })

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

/**
 * Método para actualizar un servicio según la información pasada en la petición.
 *  - Si no eres usuario no puedes acceder al método.
 */
const updateService = async (req,res) =>{

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

        await Service.findByIdAndUpdate(id, fields, {new: true})
            .then( data => {
                res.status(201).json({
                    ok: true,
                    msg: 'Servicio actualizado',
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
 * Método para eliminar un servicio.
 *  - Si no eres usuario no puedes acceder al método.
 *  - No eliminamos el servicio, lo marcamos como no activo, guardamos la fecha,
 *      el motivo y el usuario que lo desea eliminar
 */
const deleteService = async (req,res) =>{

    if(req.user.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    const id = req.params.id;

    try{

        const data = await Service.findById(id);

        if(!data){
            res.status(404).json({
                ok: false,
                msg: "No se encontró el servicio"
            });
        }

        data.active = false;
        data.deleteDate = Date.now();
        data.deleteReason = req.body.reason || 'Sin motivo';
        data.deleteUser = req.user.id;

        await Service.findByIdAndUpdate(id, data, {new: true})
            .then( data => {
            res.status(201).json({
                ok: true,
                msg: 'Servicio eliminado',
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
    getServices,
    getOneService,
    createService,
    updateService,
    deleteService,
    getAllServices
}
