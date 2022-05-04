const { v4: uuid } = require('uuid');

const fileUpload = async (req,res) =>{

    //Comprobamos si tiene permisos
    if(req.user.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    try{

        const id = req.params.id;
        const model = req.params.model;

        //Comprobamos si es un modelo de datos válido
        const modelsValids = ['user', 'aids', 'promotion', 'product', 'pet'];
        if(!modelsValids.includes(model)){
            return res.status(401).json({
                ok: false,
                msg: 'Modelo no existe'
            });
        }

        //Comprobamos si hay un archivo en la petición
        if(!req.files || Object.keys(req.files).length === 0){
            return res.status(400).json({
                ok: false,
                msg: 'No hay archivo'
            })
        }

        const file = req.files.file;
        const parts = file.name.split('.');
        const ext = parts[parts.length - 1];

        //Comprobamos si es una ext válida
        const extValid = ['png', 'jpg', 'jpeg', 'gif'];
        if(!extValid.includes(ext)){
            return res.status(401).json({
                ok: false,
                msg: 'Extensión no permitida'
            });
        }

        //Generar nombre y path
        const nameFile = `${uuid()}.${ext}`;
        const path = `./files/${model}/${nameFile}`;

        //Mover img
        file.mv(path, (err) => {
            if(err){
                res.status(500).json({
                    ok: false,
                    msg: "Error inesperado..., llame a su administrador"
                });
            }

            res.status(200).json({
                ok: true,
                msg: 'Archivo subido'
            });

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
