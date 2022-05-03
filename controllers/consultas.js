const Consulta = require('../modelos/consulta');
const Pet = require("../modelos/pet");

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
            .populate(['id_pet', 'id_user', 'service',
                'treatment', 'delete_user'])
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
            .populate(['id_pet', 'id_user', 'service',
                'treatment', 'delete_user'])
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
 *  - Guardamos el usuario que creo la consulta.
 *  - Introducimos la consulta en el array de próximas consultas del animal.
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

        const petParent = await Pet.findById(consulta.id_pet);
        petParent.next_queries.push(consulta.id);

        await Pet.findByIdAndUpdate(consulta.id_pet, petParent);

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
 * - Si actualizamos la variable de la consulta de finalizada a true, quitamos la consulta
 *      en el animal de próximas consultas a consultas ya finalizadas.
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

        if(data.finish){
            const petParent = await Pet.findById(data.id_pet);
            const num = petParent.next_queries.indexOf(id);
            const old = petParent.next_queries.splice(num, 1);
            petParent.queries.push(old);
            await Pet.findByIdAndUpdate(data.id_pet, petParent);
        }

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
 * - No eliminamos la consulta, la marcamos como no activa, guardamos la fecha,
 *      motivo y usuario que la desea eliminar.
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

        const data = await Consulta.findById(id);

        if(!data){
            res.status(404).json({
                ok: false,
                msg: "No se encontro la consulta"
            });
        }

        data.active = false;
        data.delete_date = Date.now();
        data.delete_reason = req.body.reason || 'Sin motivo';
        data.delete_user = req.usuario.id;

        await Consulta.findByIdAndUpdate(id, data, {new: true})
            .then( consulta => {
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
