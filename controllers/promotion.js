const Promotion = require('../models/promotion');

/**
 * Método para obtener todas las promociones.
 */
const getPromotions = async (req,res) =>{

    try{

        const from = (Number(req.query.page) || 0) * 5;

        const [data , total] = await Promise.all([
            Promotion.find()
                .skip( from )
                .limit(5)
                .populate('deleteUser', 'name lastName img'),

            Promotion.count()
        ]);

        res.status(200).json({
            ok: true,
            msg: "Listado de promociones",
            data,
            total
        });

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

/**
 * Método para obtener una promoción.
 */
const getOnePromotion = async (req,res)=>{

    const id = req.params.id;

    try{

        await Promotion.findById(id)
            .populate('deleteUser', 'name lastName img')
            .then( data => {
            res.status(200).json({
                ok: true,
                msg: "Promoción",
                data
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
 * Método para crear una promoción.
 *  - Si eres Usuario no puedes acceder al método.
 */
const createPromotion = async (req,res) =>{

    try{

        if(req.user.rol === 'USER_ROLE'){
            return res.status(401).json({
                ok: false,
                msg: 'Usuario sin permisos'
            });
        }

        const promotion = new Promotion (req.body);

        await promotion.save();

        res.status(201).json({
            ok: true,
            msg: 'Promoción creada',
            data: promotion
        })

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

/**
 * Método para actualizar una promoción.
 *  - Si eres Usuario no puedes acceder al método.
 */
const updatePromotion = async (req,res) =>{

    if(req.user.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    const id = req.params.id;

    try{

        const {active, deleteDate, deleteUser, deleteReason, ...fields} = req.body;

        await Promotion.findByIdAndUpdate(id, fields, {new: true})
            .then( data => {
                res.status(201).json({
                    ok: true,
                    msg: 'Promoción actualizado',
                    data
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
 * Método para eliminar una promoción.
 *  - Si eres Usuario no puedes acceder al método.
 *  - No eliminamos la promoción, lo marcamos como no activo, guardamos la fecha,
 *      el motivo y el usuario que lo desea eliminar
 */
const deletePromotion = async (req,res) =>{

    if(req.user.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    const id = req.params.id;

    try{

        const data = await Promotion.findById(id);

        if(!data){
            res.status(404).json({
                ok: false,
                msg: "No se encontró la promoción"
            });
        }

        data.active = false;
        data.deleteDate = Date.now();
        data.deleteReason = req.body.reason || 'Sin motivo';
        data.deleteUser = req.user.id;

        await Promotion.findByIdAndUpdate(id, data, {new: true})
            .then( data => {
            res.status(201).json({
                ok: true,
                msg: 'Promoción eliminada',
                data
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
    getPromotions,
    getOnePromotion,
    createPromotion,
    updatePromotion,
    deletePromotion
}
