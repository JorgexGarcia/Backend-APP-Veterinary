const Pet = require('../modelos/pet');

const getPets = async (req,res) =>{

    try{

        await Pet.find().then( pets => {
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

const getOnePet = async (req,res)=>{

    const id = req.params.id;

    try{

        await Pet.findById(id).then( pet => {
            res.json({
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

const createPet = async (req,res) =>{

    try{

        const pet = new Pet (req.body);

        await pet.save();

        res.status(201).json({
            ok: true,
            msg: 'Animal creado',
            pet
        })

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

const updatePet = async (req,res) =>{

    const id = req.params.id;

    try{

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

const deletePet = async (req,res) =>{

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
