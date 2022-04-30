const Service = require('../modelos/service');

const getServices = async (req,res) =>{

    await Service.find().then( data => {
            res.json({
                ok: true,
                service: data
            })
    }).catch(error => {
        res.json({
            ok: false,
            error
        })
    });

}

const getOneService = async (req,res)=>{

    const id = req.params.id;

    await Service.findById(id).then( data => {
        res.json({
            ok: true,
            service: data
        })
    }).catch(error => {
        res.json({
            ok: false,
            error
        })
    });
}

const createService = async (req,res) =>{

    const service = new Service (req.body);

    await service.save();

    res.json({
        ok: true,
        service
    })

}

const updateService = async (req,res) =>{

    const id = req.params.id;

    const service = await Service.findByIdAndUpdate(id, req.body, {new: true});

    res.json({
        ok: true,
        service
    })
}

const deleteService = async (req,res) =>{

    const id = req.params.id;

    const service = await Service.findByIdAndDelete(id);

    res.json({
        ok: true,
        service
    })
}

module.exports = {
    getServices,
    getOneService,
    createService,
    updateService,
    deleteService
}
