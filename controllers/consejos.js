const Consejo = require('../modelos/consejo');


/**
 * Método para obtener el listado de consejos
 */
const getConsejos = async (req,res) =>{

    try{

        await Consejo.find()
            .populate('id_user')
            .then( consejos => {
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

/**
 * Método para obtener un consejo
 */
const getOneConsejo = async (req,res)=>{

    const id = req.params.id;

    try{

        await Consejo.findById(id)
            .populate('id_user')
            .then( consejo => {
            res.status(200).json({
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

/**
 * Método para crear un consejo.
 * - Si eres usuario no puedes acceder.
 */
const createConsejo = async (req,res) =>{

    if(req.usuario.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    try{

        const consejo = new Consejo ({
            id_user: req.usuario.id,
            ...req.body
        });

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

/**
 * Método para actualizar un consejo.
 * - Si eres usuario no puedes acceder.
 */
const updateConsejo = async (req,res) =>{

    if(req.usuario.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    const id = req.params.id;

    try{

        const data = req.body;
        data.id_user = req.id;

        await Consejo.findByIdAndUpdate(id, data, {new: true})
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

/**
 * Método para eliminar un consejo.
 * - Si eres usuario no puedes acceder.
 */
const deleteConsejo = async (req,res) =>{

    if(req.usuario.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

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
