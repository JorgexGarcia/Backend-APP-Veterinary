const { v4: uuid } = require('uuid');
const cloudinary = require('cloudinary');
cloudinary.config({
   cloud_name: process.env.CLOUD_NAME,
   api_key: process.env.API_KEY,
   api_secret:process.env.API_SECRET
});
const fs = require('fs');
const User = require('../../models/user.js');
const Aids = require('../../models/aids.js');
const Promotion = require('../../models/promotion');

const updateImg = async (path, model, id, name) => {
    const result = await cloudinary.v2.uploader.upload(path, {
        public_id: name
    });

    switch (model){
        //'queries', 'product', 'pet'
        case 'user':
            const user = await User.findById(id);

            if(user.img.url){
                await cloudinary.v2.uploader.destroy(user.img.imgId);
            }

            user.img.imgId = result.public_id;
            user.img.url = result.secure_url;

            await User.findByIdAndUpdate(id, user);
            fs.unlinkSync(path);
            break;

        case 'aids':
            const aid = await Aids.findById(id);

            if(aid.img.url){
                await cloudinary.v2.uploader.destroy(aid.img.imgId);
            }

            aid.img.imgId = result.public_id;
            aid.img.url = result.secure_url;

            await Aids.findByIdAndUpdate(id, aid);
            fs.unlinkSync(path);
            break;
        case 'promotion':
            const promotion = await Promotion.findById(id);

            if(promotion.img.url){
                await cloudinary.v2.uploader.destroy(promotion.img.imgId);
            }

            promotion.img.imgId = result.public_id;
            promotion.img.url = result.secure_url;

            await Promotion.findByIdAndUpdate(id, promotion);
            fs.unlinkSync(path);
            break;
    }


}

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
        if( !req.files || Object.keys(req.files).length === 0){
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
        const name = uuid();
        const nameFile = `${name}.${ext}`;
        const path = `./files/${nameFile}`;

        //Mover img
        file.mv(path, async (err) =>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    msg: "Error inesperado..., llame a su administrador"
                });
            }

            updateImg(path, model, id, name);

            res.status(200).json({
                ok: true,
                msg: 'Archivo subido'
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
