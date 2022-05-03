const Pet = require('../modelos/pet');

/**
 * Método para obtener el listado de animales.
 *  - Si eres Usuario no puedes acceder al método.
 */
const getPets = async (req,res) =>{

    if(req.usuario.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    try{

        await Pet.find()
            .populate(['id_user','race', 'queries',
                'next_queries', 'treatment'])
            .then( pets => {
            res.status(200).json({
                ok: true,
                msg: "Listado de animales",
                pets
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
 * Método para obtener un animal.
 *  - Si eres Usuario no puedes acceder al método.
 */
const getOnePet = async (req,res)=>{

    if(req.usuario.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    const id = req.params.id;

    try{

        await Pet.findById(id)
            .populate(['id_user','race', 'queries',
                'next_queries', 'treatment'])
            .then( pet => {
            res.status(200).json({
                ok: true,
                msg: "Animal",
                pet
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
 *  - Si no lo tiene, le introducimos la concadenación del id del dueño con el nombre del animal.
 */
const createPet = async (req,res) =>{

    if(req.usuario.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    try{

        const {chip, passport} = req.body;

        const pet = new Pet (req.body);

        const newData = `${pet.name}${pet.id_user}`;

        if(chip){
            const existeChip = await Pet.findOne({chip});

            if(existeChip){
                return res.status(409).json({
                    ok: false,
                    msg: 'El chip ya esta registrado'
                });
            }

        }else{
            const existeChip = await Pet.findOne({chip: newData});

            if(existeChip){
                return res.status(409).json({
                    ok: false,
                    msg: 'El chip ya esta registrado'
                });
            }else{
                pet.chip = newData;
            }
        }

        if(passport){
            const existePassport = await Pet.findOne({passport});

            if(existePassport){
                return res.status(409).json({
                    ok: false,
                    msg: 'El pasaporte ya esta registrado'
                });
            }

        }else{
            const existePassport = await Pet.findOne({passport: newData});

            if(existePassport){
                return res.status(409).json({
                    ok: false,
                    msg: 'El pasaporte ya esta registrado'
                });

            }else{
                pet.passport = newData;
            }
        }

        await pet.save();

        res.status(201).json({
            ok: true,
            msg: 'Animal creado',
            pet
        })

    }catch (error) {
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

    req.usuario.list_pets.forEach( idUser => {
        if(idUser.toString() === id){
            checkPet = true;
        }
    })

    if(req.usuario.rol === 'USER_ROLE' || !checkPet){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    try{

        const {chip, passport} = req.body;

        const existeChip = await Pet.findOne({chip});

        if(existeChip){
            return res.status(409).json({
                ok: false,
                msg: 'El chip ya esta registrado'
            });
        }

        const existePassport = await Pet.findOne({passport});

        if(existePassport){
            return res.status(409).json({
                ok: false,
                msg: 'El pasaporte ya esta registrado'
            });
        }

        await Pet.findByIdAndUpdate(id, req.body, {new: true})
            .then( pet => {
                res.status(201).json({
                    ok: true,
                    msg: 'Animal actualizado',
                    pet
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
 */
const deletePet = async (req,res) =>{

    if(req.usuario.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    const id = req.params.id;

    try{

        await Pet.findByIdAndDelete(id).then( pet => {
            res.status(201).json({
                ok: true,
                msg: 'Animal eliminado',
                pet
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
