const Queries = require('../../models/queries');
const Pet = require("../../models/pet");

/**
 * Método para obtener todas las consultas.
 *  - Si eres usuario no puedes acceder a este método.
 */
const getQueries = async (req,res) =>{

    if(req.user.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    try{

        const active = req.params.active || true;

        const from = (Number(req.query.page) || 0) * 5;

        const [data , total] = await Promise.all([
            Queries.find({active: active})
                .skip( from )
                .limit(5)
                .populate('idPet', 'id name img')
                .populate('service', 'id name')
                .populate('treatment', 'id name')
                .populate('idUser', 'id name lastName img')
                .populate('deleteUser', 'id name lastName img'),

            Queries.countDocuments({active: active})
        ]);

        res.status(200).json({
            ok: true,
            msg: "Listado de consultas",
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

const getAllQueries = async (req,res) =>{

    try{

        await Queries.find()
            .populate('idPet', 'id name img')
            .populate('service', 'id name')
            .populate('treatment', 'id name')
            .populate('idUser', 'id name lastName img')
            .populate('deleteUser', 'id name lastName img')
            .then(
                data => {
                    res.status(200).json({
                        ok: true,
                        msg: "Listado de consultas",
                        data
                    })
                }
            ).catch(err => {
                res.status(400).json({
                    ok: true,
                    msg: err
                })
            })



    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado..., llame a su administrador"
        });
    }

}

/**
 * Método para obtener una consulta.
 * - Si eres usuario no puedes acceder.
 */
const getOneQueries = async (req,res)=>{

    if(req.user.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    const id = req.params.id;

    try{

        await Queries.findById(id)
            .populate('idPet', 'id name img')
            .populate('service', 'id name')
            .populate('treatment', 'id name')
            .populate('idUser', 'id name lastName img')
            .populate('deleteUser', 'id name lastName img')
            .then( data => {
            res.status(200).json({
                ok: true,
                msg: "Consulta",
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
 * Método para crear una consulta.
 *  - Si eres Usuario no puedes acceder.
 *  - Introducimos la consulta en el array de próximas consultas del animal.
 */
const createQueries = async (req,res) =>{

    if(req.user.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    try{

        const queries = new Queries({
            ...req.body
        });

        await queries.save();

        const petParent = await Pet.findById(queries.idPet);
        petParent.nextQueries.push(queries.id);

        await Pet.findByIdAndUpdate(queries.idPet, petParent);

        res.status(201).json({
            ok: true,
            msg: 'Consulta creada',
            data: queries
        })

    }catch (error) {
        console.log(error)
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
const updateQueries = async (req,res) =>{

    if(req.user.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    const id = req.params.id;

    try{

        //Elementos que no se pueden actualizar
        const {deleteDate, deleteUser, deleteReason, ...fields} = req.body;

        const data = fields;
        data.idUser = req.id;

        if(data.finish){
            const petParent = await Pet.findById(data.idPet);
            const num = petParent.nextQueries.indexOf(id);
            const old = petParent.nextQueries.splice(num, 1);
            petParent.queries.push(old);
            await Pet.findByIdAndUpdate(data.idPet, petParent);
        }

        await Queries.findByIdAndUpdate(id, data, {new: true})
            .then( data => {
                res.status(201).json({
                    ok: true,
                    msg: 'Consulta actualizada',
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
 * Método para actualizar una consulta.
 * - Si eres usuario no puedes acceder.
 * - No eliminamos la consulta, la marcamos como no activa, guardamos la fecha,
 *      motivo y usuario que la desea eliminar.
 */
const deleteQueries = async (req,res) =>{

    if(req.user.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    const id = req.params.id;

    try{

        const data = await Queries.findById(id);

        if(!data){
            res.status(404).json({
                ok: false,
                msg: "No se encontró la consulta"
            });
        }

        data.active = false;
        data.deleteDate = Date.now();
        data.deleteReason = req.body.reason || 'Sin motivo';
        data.deleteUser = req.user.id;

        await Queries.findByIdAndUpdate(id, data, {new: true})
            .then( data => {
            res.status(201).json({
                ok: true,
                msg: 'Consulta eliminada',
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
    getQueries,
    getOneQueries,
    createQueries,
    updateQueries,
    deleteQueries,
    getAllQueries
}
