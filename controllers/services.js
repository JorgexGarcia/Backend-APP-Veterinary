const Service = require('../modelos/service');

/**
 * Método para conseguir todos los servicios.
 */
const getServices = async (req,res) =>{

    try{

        await Service.find().then( servicios => {
            res.status(200).json({
                ok: true,
                msg: "Listado de servicios",
                servicios
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
 * Método para conseguir un servicio según su id enviada por la url.
 */
const getOneService = async (req,res)=>{

    const id = req.params.id;

    try{

        await Service.findById(id).then( servicio => {
            res.status(200).json({
                ok: true,
                msg: "Servicio",
                servicio
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
 *  - Sin eres usuario no puedes acceder al método.
 */
const createService = async (req,res) =>{

    try{

        if(req.usuario.rol === 'USER_ROLE'){
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
            servicio: service
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
 *  - Sin eres usuario no puedes acceder al método.
 */
const updateService = async (req,res) =>{

    if(req.usuario.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    const id = req.params.id;

    try{

        await Service.findByIdAndUpdate(id, req.body, {new: true})
            .then( servicio => {
                res.status(201).json({
                    ok: true,
                    msg: 'Servicio actualizado',
                    servicio
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
 *  - Sin eres usuario no puedes acceder al método.
 */
const deleteService = async (req,res) =>{

    if(req.usuario.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    const id = req.params.id;

    try{

        await Service.findByIdAndDelete(id).then( servicio => {
            res.status(201).json({
                ok: true,
                msg: 'Servicio eliminado',
                servicio
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
    deleteService
}
