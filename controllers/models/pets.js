const Pet = require('../../models/pet');
const User = require("../../models/user");

/**
 * Método para obtener el listado de animales.
 *  - Si eres Usuario no puedes acceder al método.
 */
const getPets = async (req,res) =>{

    if(req.user.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    try{

        const from = (Number(req.query.page) || 0) * 5;

        const [data , total] = await Promise.all([
            Pet.find()
                .skip( from )
                .limit(5)
                .populate('breed', 'name')
                .populate('treatment', 'name')
                .populate('nextQueries', 'type')
                .populate('queries', 'type')
                .populate('idUser', 'name lastName img')
                .populate('deleteUser', 'name lastName img'),

            Pet.countDocuments()
        ]);

        res.status(200).json({
            ok: true,
            msg: "Listado de animales",
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
 * Método para obtener un animal.
 *  - Si eres Usuario no puedes acceder al método.
 */
const getOnePet = async (req,res)=>{

    if(req.user.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    const id = req.params.id;

    try{

        await Pet.findById(id)
            .populate('breed', 'name')
            .populate('treatment', 'name')
            .populate('nextQueries', 'type')
            .populate('queries', 'type')
            .populate('idUser', 'name lastName img')
            .populate('deleteUser', 'name lastName img')
            .then( data => {
            res.status(200).json({
                ok: true,
                msg: "Animal",
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
 * Método para crear un animal.
 *  - Si eres Usuario no puedes acceder al método.
 *  - Comprobamos si ya hay un chip o un pasaporte registrado.
 *  - Si no lo tiene, le introducimos la id del dueño
 *          con el nombre del animal y la fecha.
 *  - Si creamos el animal, introducimos en el dueño del animal la id en su lista
 */
const createPet = async (req,res) =>{

    if(req.user.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    try{

        const {chip, passport} = req.body;

        const pet = new Pet (req.body);

        if(!req.body.img){
            pet.img = {
                imgId: 'Null',
                url: 'https://res.cloudinary.com/app-veterinary/image/upload/v1651750342/no-img.jpg'
            }
        }

        const newData = `${pet.name}${pet.id_user}${Date.now()}`;

        if(chip){
            const checkChip = await Pet.findOne({chip});

            if(checkChip){
                return res.status(409).json({
                    ok: false,
                    msg: 'El chip ya esta registrado'
                });
            }

        }else{
            pet.chip = newData;
        }

        if(passport){
            const checkPassport = await Pet.findOne({passport});

            if(checkPassport){
                return res.status(409).json({
                    ok: false,
                    msg: 'El pasaporte ya esta registrado'
                });
            }

        }else{
            pet.passport = newData;
        }

        await pet.save();

        const userParent = await User.findById(pet.idUser)
        userParent.listPets.push(pet.id);

        await User.findByIdAndUpdate(pet.idUser, userParent);

        res.status(201).json({
            ok: true,
            msg: 'Animal creado',
            data: pet
        });

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

/**
 * Método para actualizar un animal.
 *  - Si eres Usuario no puedes acceder al método, puedes acceder si es tu animal.
 *   - Comprobamos si ya hay un chip o un pasaporte registrado.
 */
const updatePet = async (req,res) =>{

    let checkPet = false;
    const id = req.params.id;

    req.user.listPets.forEach( idUser => {
        if(idUser.toString() === id){
            checkPet = true;
        }
    })

    if(req.user.rol === 'USER_ROLE' || !checkPet){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    try{

        //Elementos que no se pueden actualizar
        const {chip, passport,
            active, deleteDate, deleteUser, deleteReason, ...fields} = req.body;

        const checkChip = await Pet.findOne({chip});

        if(checkChip){
            return res.status(409).json({
                ok: false,
                msg: 'El chip ya esta registrado'
            });
        }

        const checkPassport = await Pet.findOne({passport});

        if(checkPassport){
            return res.status(409).json({
                ok: false,
                msg: 'El pasaporte ya esta registrado'
            });
        }

        fields.chip = chip;
        fields.passport = passport;

        await Pet.findByIdAndUpdate(id, fields, {new: true})
            .then( data => {
                res.status(201).json({
                    ok: true,
                    msg: 'Animal actualizado',
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
 * Método para eliminar un animal.
 *  - Si eres Usuario no puedes acceder al método.
 *  - No eliminamos el animal, lo marcamos como no activo, guardamos la fecha,
 *      el motivo y el usuario que lo desea eliminar
 */
const deletePet = async (req,res) =>{

    if(req.user.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    const id = req.params.id;

    try{

        const data = await Pet.findById(id);

        if(!data){
            res.status(404).json({
                ok: false,
                msg: "No se encontró el animal"
            });
        }

        data.active = false;
        data.deleteDate = Date.now();
        data.deleteReason = req.body.reason || 'Sin motivo';
        data.deleteUser = req.user.id;

        await Pet.findByIdAndUpdate(id, data, {new: true})
            .then( data => {
            res.status(201).json({
                ok: true,
                msg: 'Animal eliminado',
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
    getPets,
    createPet,
    getOnePet,
    deletePet,
    updatePet
}
