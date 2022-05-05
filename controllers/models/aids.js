const Aid = require('../../models/aids');

/**
 * Método para obtener el listado de consejos
 */
const getAids = async (req,res) =>{

    try{

        const from = (Number(req.query.page) || 0) * 5;

        const [data , total] = await Promise.all([
            Aid.find()
                .skip( from )
                .limit(5)
                .populate('idUser', 'name lastName img'),

            Aid.countDocuments()
        ]);

        res.status(200).json({
            ok: true,
            msg: "Listado de consejos",
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
 * Método para obtener un consejo
 */
const getOneAid = async (req,res)=>{

    const id = req.params.id;

    try{

        await Aid.findById(id)
            .populate('idUser', 'name lastName img')
            .then( data => {
            res.status(200).json({
                ok: true,
                msg: "Consejo",
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
 * Método para crear un consejo.
 * - Si eres usuario no puedes acceder.
 * - Guardamos el usuario que creo el consejo.
 */
const createAid = async (req,res) =>{

    if(req.user.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    try{

        const aid = new Aid({
            id_user: req.user.id,
            ...req.body
        });

        if(!req.body.img){
            aid.img = {
                imgId: 'Null',
                url: 'https://res.cloudinary.com/app-veterinary/image/upload/v1651750342/e10c4a2f-3196-4ab1-a99b-5e37c7200112.jpg'
            }
        }

        await aid.save();

        res.status(201).json({
            ok: true,
            msg: 'Consejo creado',
            data: aid
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
 * - Guardamos el usuario que modifico el consejo.
 */
const updateAid = async (req,res) =>{

    if(req.user.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    const id = req.params.id;

    try{

        const data = req.body;
        data.idUser = req.id;

        await Aid.findByIdAndUpdate(id, data, {new: true})
            .then( data => {
                res.status(201).json({
                    ok: true,
                    msg: 'Consejo actualizado',
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
 * Método para eliminar un consejo.
 * - Si eres usuario no puedes acceder.
 */
const deleteAid = async (req,res) =>{

    if(req.user.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    const id = req.params.id;

    try{

        await Aid.findByIdAndDelete(id)
            .then( data => {
                res.status(201).json({
                    ok: true,
                    msg: 'Consejo eliminado',
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
    getAids,
    getOneAid,
    createAid,
    updateAid,
    deleteAid
}
