const Consulta = require('../modelos/consulta');

const getConsultas = async (req,res) =>{

    try{

        await Consulta.find().then( consultas => {
            res.status(200).json({
                ok: true,
                msg: "Listado de consultas",
                consultas
            })
        });


    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

const getOneConsulta = async (req,res)=>{

    const id = req.params.id;

    try{

        await Consulta.findById(id).then( consulta => {
            res.json({
                ok: true,
                msg: "Consulta",
                consulta
            });
        });

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

const createConsulta = async (req,res) =>{

    try{

        const consulta = new Consulta (req.body);

        await consulta.save();

        res.status(201).json({
            ok: true,
            msg: 'Consulta creada',
            consulta
        })

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

const updateConsulta = async (req,res) =>{

    const id = req.params.id;

    try{

        await Consulta.findByIdAndUpdate(id, req.body, {new: true})
            .then( consulta => {
                res.status(201).json({
                    ok: true,
                    msg: 'Consulta actualizada',
                    consulta
                })
            });

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

const deleteConsulta = async (req,res) =>{

    const id = req.params.id;

    try{

        await Consulta.findByIdAndDelete(id).then( consulta => {
            res.status(201).json({
                ok: true,
                msg: 'Consulta eliminada',
                consulta
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
    getConsultas,
    getOneConsulta,
    createConsulta,
    updateConsulta,
    deleteConsulta
}