const Consulta = require('../modelos/consulta');

/**
 * Método para obtener todas las consultas.
 *  - Si eres usuario no puedes acceder a este método.
 */
const getConsultas = async (req,res) =>{

    if(req.usuario.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    try{

        await Consulta.find()
            .populate(['id_pet', 'id_user', 'service', 'treatment'])
            .then( consultas => {
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

/**
 * Método para obtener una consulta.
 * - Si eres usuario no puedes acceder.
 */
const getOneConsulta = async (req,res)=>{

    if(req.usuario.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    const id = req.params.id;

    try{

        await Consulta.findById(id)
            .populate(['id_pet', 'id_user', 'service', 'treatment'])
            .then( consulta => {
            res.status(200).json({
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

/**
 * Método para crear una consulta.
 *  - Si eres Usuario no puedes acceder.
 */
const createConsulta = async (req,res) =>{

    if(req.usuario.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    try{

        const consulta = new Consulta ({
            id_user: req.usuario.id,
            ...req.body
        });

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

/**
 * Método para actualizar una consulta.
 * - Si eres usuario no puedes acceder.
 */
const updateConsulta = async (req,res) =>{

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

        await Consulta.findByIdAndUpdate(id, data, {new: true})
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

/**
 * Método para actualizar una consulta.
 * - Si eres usuario no puedes acceder.
 */
const deleteConsulta = async (req,res) =>{

    if(req.usuario.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

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
