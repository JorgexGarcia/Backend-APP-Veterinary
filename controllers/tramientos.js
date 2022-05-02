const Tratamiento = require('../modelos/tratamiento');

const getTratamientos = async (req,res) =>{

    try{

        await Tratamiento.find().then( tratamientos => {
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

const getOneTratamiento = async (req,res)=>{

    const id = req.params.id;

    try{

        await Tratamiento.findById(id).then( tratamiento => {
            res.json({
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

const createTratamiento = async (req,res) =>{

    try{

        const tratamiento = new Tratamiento (req.body);

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

const updateTratamiento = async (req,res) =>{

    const id = req.params.id;

    try{

        await Tratamiento.findByIdAndUpdate(id, req.body, {new: true})
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
            msg: "Error inesperado...., llame a su administrador"
        });
    }
}

const deleteTratamiento = async (req,res) =>{

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
