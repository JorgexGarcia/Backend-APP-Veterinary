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
        const active = req.params.active || true;

        const from = (Number(req.query.page) || 0) * 5;

        const [data , total] = await Promise.all([
            Pet.find({active: active})
                .skip( from )
                .limit(5)
                .populate('breed', 'id name')
                .populate('treatment', 'id name')
                .populate('nextQueries', 'id type')
                .populate('queries', 'id type')
                .populate('idUser', 'id name lastName img')
                .populate('deleteUser', 'id name lastName img'),

            Pet.countDocuments({active: active})
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

const getAllPets = async (req,res) =>{

    try{

        await Pet.find()
            .populate('deleteUser', 'id name lastName img').then(
                data => {
                    res.status(200).json({
                        ok: true,
                        msg: "Listado de promociones",
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
            .populate('breed', 'id name')
            .populate('treatment', 'id name')
            .populate('nextQueries', 'id type')
            .populate('queries', 'id type')
            .populate('idUser', 'id name lastName img')
            .populate('deleteUser', 'id name lastName img')
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

        const {chip, passport, idUser, ...fields} = req.body;

        const pet = new Pet (fields);

        if(!fields.img){
            pet.img = {
                imgId: 'Null',
                url: 'https://res.cloudinary.com/app-veterinary/image/upload/v1651750342/no-img.jpg'
            }
        }

        const newData = `${pet.name}${pet.idUser}${Date.now()}`;

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

        pet.chip = chip;
        pet.passport = passport;

        await pet.save();

        res.status(201).json({
            ok: true,
            msg: 'Animal creado',
            data: pet
        });

    }catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador",
            error
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

    if(req.user.rol === 'USER_ROLE' && !checkPet){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    try{

        const petDB = await Pet.findById(id);

        if(!petDB){
            res.status(404).json({
                ok: false,
                msg: "No se encontró el animal"
            });
        }

        //Elementos que no se pueden actualizar
        const {chip, passport, deleteDate,idUser, deleteUser, deleteReason, ...fields} = req.body;

        if(petDB.chip !== chip){
            const checkChip = await Pet.findOne({chip});

            if(checkChip){
                return res.status(409).json({
                    ok: false,
                    msg: 'El chip ya esta registrado'
                });
            }
        }
        if(chip !== ''){
            fields.chip = chip;
        }

        if(petDB.passport !== passport){
            const checkPassport = await Pet.findOne({passport});

            if(checkPassport){
                return res.status(409).json({
                    ok: false,
                    msg: 'El pasaporte ya esta registrado'
                });
            }
        }
        if(passport !== ''){
            fields.passport = passport;
        }

        if(idUser){
            if(idUser.length > 1){
                const userParent = await User.findById(idUser);
                if(!userParent.listPets.includes(petDB.id)){
                    userParent.listPets.push(petDB.id);
                }
                await User.findByIdAndUpdate(idUser, userParent);
                fields.idUser = idUser;

                if(petDB.idUser){
                    let userOldParent = await User.findById(petDB.idUser) ;
                    userOldParent.listPets = userOldParent.listPets.filter((item) => item.toString() !== petDB.id);
                    await User.findByIdAndUpdate(petDB.idUser, userOldParent);
                }
            }
        }


        await Pet.findByIdAndUpdate(id, fields, {new: true})
            .then( data => {
                res.status(201).json({
                    ok: true,
                    msg: 'Animal actualizado',
                    data
                })
            });

    }catch (error) {
        console.log(error)
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
    updatePet,
    getAllPets
}
