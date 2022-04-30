const Consejo = require('../modelos/consejo');

const getConsejos = async (req,res) =>{

    await Consejo.find().then( data => {
            res.json({
                ok: true,
                consejo: data
            })
    }).catch(error => {
        res.json({
            ok: false,
            error
        })
    });

}

const getOneConsejo = async (req,res)=>{

    const id = req.params.id;

    await Consejo.findById(id).then( data => {
        res.json({
            ok: true,
            consejo: data
        })
    }).catch(error => {
        console.log('error');
        res.json({
            ok: false,
            error
        })
    });
}

const createConsejo = async (req,res) =>{

    const consejo = new Consejo (req.body);

    await consejo.save();

    res.json({
        ok: true,
        consejo
    })

}

const updateConsejo = async (req,res) =>{

    const id = req.params.id;

    const consejo = await Consejo.findByIdAndUpdate(id, req.body, {new: true});

    res.json({
        ok: true,
        consejo
    })
}

const deleteConsejo = async (req,res) =>{

    const id = req.params.id;

    const consejo = await Consejo.findByIdAndDelete(id);

    res.json({
        ok: true,
        consejo
    })
}

module.exports = {
    getConsejos,
    getOneConsejo,
    createConsejo,
    updateConsejo,
    deleteConsejo
}
