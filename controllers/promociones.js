const Promocion = require('../modelos/promocion');

const getPromociones = async (req,res) =>{

    await Promocion.find().then( data => {
            res.json({
                ok: true,
                promocion: data
            })
    }).catch(error => {
        res.json({
            ok: false,
            error
        })
    });

}

const getOnePromocion = async (req,res)=>{

    const id = req.params.id;

    await Promocion.findById(id).then( data => {
        res.json({
            ok: true,
            promocion: data
        })
    }).catch(error => {
        console.log('error');
        res.json({
            ok: false,
            error
        })
    });
}

const createPromocion = async (req,res) =>{

    const promocion = new Promocion (req.body);

    await promocion.save();

    res.json({
        ok: true,
        promocion
    })

}

const updatePromocion = async (req,res) =>{

    const id = req.params.id;

    const promocion = await Promocion.findByIdAndUpdate(id, req.body, {new: true});

    res.json({
        ok: true,
        promocion
    })
}

const deletePromocion = async (req,res) =>{

    const id = req.params.id;

    const promocion = await Promocion.findByIdAndDelete(id);

    res.json({
        ok: true,
        promocion
    })
}

module.exports = {
    getPromociones,
    getOnePromocion,
    createPromocion,
    updatePromocion,
    deletePromocion
}
