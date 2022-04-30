const Pet = require('../modelos/pet');

const getPets = async (req,res) =>{

    await Pet.find().then( data => {
            res.json({
                ok: true,
                pets: data
            })
    }).catch(error => {
            console.log('error');
        res.json({
            ok: false,
            error
        })
    });

}

const getOnePet = async (req,res)=>{

    const id = req.params.id;

    await Pet.findById(id).then( data => {
        res.json({
            ok: true,
            pet: data
        })
    }).catch(error => {
        console.log('error');
        res.json({
            ok: false,
            error
        })
    });
}

const createPet = async (req,res) =>{

    const pet = new Pet (req.body);

    await pet.save();

    res.json({
        ok: true,
        pet
    })

}

const updatePet = async (req,res) =>{

    const id = req.params.id;

    const pet = await Pet.findByIdAndUpdate(id, req.body, {new: true});

    res.json({
        ok: true,
        pet
    })
}

const deletePet = async (req,res) =>{

    const id = req.params.id;

    const pet = await Pet.findByIdAndDelete(id);

    res.json({
        ok: true,
        pet
    })
}

module.exports = {
    getPets,
    createPet,
    getOnePet,
    deletePet,
    updatePet
}
