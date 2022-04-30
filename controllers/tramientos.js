const Tratamiento = require('../modelos/tratamiento');

const getTratamientos = async (req,res) =>{

    await Tratamiento.find().then( data => {
            res.json({
                ok: true,
                tratamiento: data
            })
    }).catch(error => {
        res.json({
            ok: false,
            error
        })
    });

}

const getOneTratamiento = async (req,res)=>{

    const id = req.params.id;

    await Tratamiento.findById(id).then( data => {
        res.json({
            ok: true,
            tratamiento: data
        })
    }).catch(error => {
        res.json({
            ok: false,
            error
        })
    });
}

const createTratamiento = async (req,res) =>{

    const tratamiento = new Tratamiento (req.body);

    await tratamiento.save();

    res.json({
        ok: true,
        tratamiento
    })

}

const updateTratamiento = async (req,res) =>{

    const id = req.params.id;

    const tratamiento = await Tratamiento.findByIdAndUpdate(id, req.body, {new: true});

    res.json({
        ok: true,
        tratamiento
    })
}

const deleteTratamiento = async (req,res) =>{

    const id = req.params.id;

    const tratamiento = await Tratamiento.findByIdAndDelete(id);

    res.json({
        ok: true,
        tratamiento
    })
}

module.exports = {
    getTratamientos,
    getOneTratamiento,
    createTratamiento,
    updateTratamiento,
    deleteTratamiento
}
