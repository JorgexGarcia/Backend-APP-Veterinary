const Consulta = require('../modelos/consulta');

const getConsultas = async (req,res) =>{

    await Consulta.find().then( data => {
            res.json({
                ok: true,
                consulta: data
            })
    }).catch(error => {
        res.json({
            ok: false,
            error
        })
    });

}

const getOneConsulta = async (req,res)=>{

    const id = req.params.id;

    await Consulta.findById(id).then( data => {
        res.json({
            ok: true,
            consulta: data
        })
    }).catch(error => {
        console.log('error');
        res.json({
            ok: false,
            error
        })
    });
}

const createConsulta = async (req,res) =>{

    const consulta = new Consulta (req.body);

    await consulta.save();

    res.json({
        ok: true,
        consulta
    })

}

const updateConsulta = async (req,res) =>{

    const id = req.params.id;

    const consulta = await Consulta.findByIdAndUpdate(id, req.body, {new: true});

    res.json({
        ok: true,
        consulta
    })
}

const deleteConsulta = async (req,res) =>{

    const id = req.params.id;

    const consulta = await Consulta.findByIdAndDelete(id);

    res.json({
        ok: true,
        consulta
    })
}

module.exports = {
    getConsultas,
    getOneConsulta,
    createConsulta,
    updateConsulta,
    deleteConsulta
}
