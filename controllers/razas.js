const Raza = require('../modelos/raza');

/**
 * Método para obtener el listado de razas.
 *  - Si eres Usuario no puedes acceder al método.
 */
const getRazas = async (req,res) =>{

    try{

        if(req.usuario.rol === 'USER_ROLE'){
            return res.status(401).json({
                ok: false,
                msg: 'Usuario sin permisos'
            });
        }

        await Raza.find()
            .populate('delete_user')
            .then( razas => {
            res.status(200).json({
                ok: true,
                msg: "Listado de razas",
                razas
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
 * Método para obtener una raza.
 *  - Si eres Usuario no puedes acceder al método.
 */
const getOneRaza = async (req,res)=>{

    if(req.usuario.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    const id = req.params.id;

    try{

        await Raza.findById(id)
            .populate('delete_user')
            .then( raza => {
            res.status(200).json({
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

/**
 * Método para crear una raza.
 *  - Si eres Usuario no puedes acceder al método.
 */
const createRaza = async (req,res) =>{

    try{

        if(req.usuario.rol === 'USER_ROLE'){
            return res.status(401).json({
                ok: false,
                msg: 'Usuario sin permisos'
            });
        }

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

/**
 * Método para actualizar una raza.
 *  - Si eres Usuario no puedes acceder al método.
 */
const updateRaza = async (req,res) =>{

    if(req.usuario.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

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

/**
 * Método para borrar una raza.
 *  - Si eres Usuario no puedes acceder al método.
 */
const deleteRaza = async (req,res) =>{

    if(req.usuario.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    const id = req.params.id;

    try{

        const data = await Raza.findById(id);

        if(!data){
            res.status(404).json({
                ok: false,
                msg: "No se encontro la raza"
            });
        }

        data.active = false;
        data.delete_date = Date.now();
        data.delete_reason = req.body.reason || 'Sin motivo';
        data.delete_user = req.usuario.id;

        await Raza.findByIdAndUpdate(id, data, {new: true})
            .then( raza => {
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
