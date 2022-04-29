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

const createConsulta = async (req,res) =>{

    const consulta = new Consulta (req.body);

    await consulta.save();

    res.json({
        ok: true,
        consulta
    })

}

module.exports = {
    getConsultas,
    createConsulta
}
