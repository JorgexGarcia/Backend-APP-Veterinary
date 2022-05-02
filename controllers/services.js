const Service = require('../modelos/service');

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

const getOneService = async (req,res)=>{

    const id = req.params.id;

    try{

        await Service.findById(id).then( servicio => {
            res.json({
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

const createService = async (req,res) =>{

    try{

        const service = new Service (req.body);

        await service.save();

        res.status(201).json({
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

const updateService = async (req,res) =>{

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

const deleteService = async (req,res) =>{

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
