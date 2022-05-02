const Raza = require('../modelos/raza');

const getRazas = async (req,res) =>{

    try{

        await Raza.find().then( raza => {
            res.status(200).json({
                ok: true,
                msg: "Listado de razas",
                raza
            })
        });


    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

const getOneRaza = async (req,res)=>{

    const id = req.params.id;

    try{

        await Raza.findById(id).then( raza => {
            res.json({
                ok: true,
                msg: "Raza",
                raza
            });
        });

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

const createRaza = async (req,res) =>{

    try{

        const raza = new Raza (req.body);

        await raza.save();

        res.status(201).json({
            ok: true,
            msg: 'Raza creada',
            raza
        })

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

const updateRaza = async (req,res) =>{

    const id = req.params.id;

    try{

        await Raza.findByIdAndUpdate(id, req.body, {new: true})
            .then( raza => {
                res.status(201).json({
                    ok: true,
                    msg: 'Raza actualizada',
                    raza
                })
            });

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

const deleteRaza = async (req,res) =>{

    const id = req.params.id;

    try{

        await Raza.findByIdAndDelete(id).then( raza => {
            res.status(201).json({
                ok: true,
                msg: 'Raza eliminada',
                raza
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
    getRazas,
    getOneRaza,
    createRaza,
    updateRaza,
    deleteRaza
}
