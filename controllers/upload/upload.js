

const fileUpload = async (req,res) =>{

    if(req.user.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    try{

        const id = req.params.id;
        const model = req.params.model;

        const modelsValids = ['user', 'aids', 'treatment', 'service', 'queries',
            'promotion', 'product', 'pet', 'breed'];
        if(!modelsValids.includes(model)){
            return res.status(401).json({
                ok: false,
                msg: 'Modelo no existe'
            });
        }

        if( !req.file || Object.keys(req.file).length === 0){
            return res.status(401).json({
                ok: false,
                msg: 'No hay ningún archivo'
            });
        }


        res.status(200).json({
            ok: true
        });

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado..., llame a su administrador"
        });
    }

}

module.exports = {
    fileUpload
}
