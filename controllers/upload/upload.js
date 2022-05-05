const { v4: uuid } = require('uuid');
const cloudinary = require('cloudinary');
cloudinary.config({
   cloud_name: 'app-veterinary',
   api_key: '887253888763596',
   api_secret:'EfqZ_HpTIAtfy6a1ao-vpRRTU4Y'
});

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
        const modelsValids = ['user', 'aids', 'queries',
            'promotion', 'product', 'pet'];
        if(!modelsValids.includes(model)){
            return res.status(401).json({
                ok: false,
                msg: 'Modelo no existe'
            });
        }

        //Comprobamos si hay un archivo en la petición
        if( !req.file || Object.keys(req.file).length === 0){
            return res.status(401).json({
                ok: false,
                msg: 'No hay ningún archivo'
            });
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
        const path = `./files/${nameFile}`;

        //Mover img
        file.mv(path, async (err) =>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    msg: "Error inesperado..., llame a su administrador"
                });
            }

            const result = await cloudinary.v2.uploader.upload(path);

            res.status(200).json({
                ok: true,
                msg: 'Archivo subido',
                data: result.public_id
            });
        })

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
