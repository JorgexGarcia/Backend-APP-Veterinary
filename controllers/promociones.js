const Promocion = require('../modelos/promocion');

const getPromociones = async (req,res) =>{

    try{

        await Promocion.find().then( promociones => {
            res.status(200).json({
                ok: true,
                msg: "Listado de promociones",
                promociones
            })
        });


    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

const getOnePromocion = async (req,res)=>{

    const id = req.params.id;

    try{

        await Promocion.findById(id).then( promocion => {
            res.json({
                ok: true,
                msg: "Promoción",
                promocion
            });
        });

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }
}

const createPromocion = async (req,res) =>{

    try{

        const promocion = new Promocion (req.body);

        await promocion.save();

        res.status(201).json({
            ok: true,
            msg: 'Promoción creada',
            promocion
        })

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

const updatePromocion = async (req,res) =>{

    const id = req.params.id;

    try{

        await Promocion.findByIdAndUpdate(id, req.body, {new: true})
            .then( promocion => {
                res.status(201).json({
                    ok: true,
                    msg: 'Promoción actualizado',
                    promocion
                })
            });

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

const deletePromocion = async (req,res) =>{

    const id = req.params.id;

    try{

        await Promocion.findByIdAndDelete(id).then( promocion => {
            res.status(201).json({
                ok: true,
                msg: 'Promoción eliminada',
                promocion
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
    getPromociones,
    getOnePromocion,
    createPromocion,
    updatePromocion,
    deletePromocion
}
