const Consejo = require('../modelos/consejo');

const getConsejos = async (req,res) =>{

    try{

        await Consejo.find().then( consejos => {
            res.status(200).json({
                ok: true,
                msg: "Listado de consejos",
                consejos
            })
        });


    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

const getOneConsejo = async (req,res)=>{

    const id = req.params.id;

    try{

        await Consejo.findById(id).then( consejo => {
            res.json({
                ok: true,
                msg: "Consejo",
                consejo
            });
        });

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

const createConsejo = async (req,res) =>{

    try{

        const consejo = new Consejo (req.body);

        await consejo.save();

        res.status(201).json({
            ok: true,
            msg: 'Consejo creado',
            consejo
        })

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

const updateConsejo = async (req,res) =>{

    const id = req.params.id;

    try{

        await Consejo.findByIdAndUpdate(id, req.body, {new: true})
            .then( consejo => {
                res.status(201).json({
                    ok: true,
                    msg: 'Consejo actualizado',
                    consejo
                })
            });

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

const deleteConsejo = async (req,res) =>{

    const id = req.params.id;

    try{

        await Consejo.findByIdAndDelete(id).then( consejo => {
            res.status(201).json({
                ok: true,
                msg: 'Consejo eliminado',
                consejo
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
    getConsejos,
    getOneConsejo,
    createConsejo,
    updateConsejo,
    deleteConsejo
}
