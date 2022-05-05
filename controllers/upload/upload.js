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
const Product = require('../../models/product');
const Pet = require('../../models/pet');
const Queries = require('../../models/queries');

const updateImg = async (path, model, id, name, type) => {

    let result;

    switch (model){
        case 'user':
            result = await cloudinary.v2.uploader.upload(path, {
                public_id: name
            });

            const user = await User.findById(id);

            if(user.img.url){
                await cloudinary.v2.uploader.destroy(user.img.imgId);
            }

            user.img.imgId = result.public_id;
            user.img.url = result.secure_url;

            await user.save();

            fs.unlinkSync(path);

            break;

        case 'aids':
            result = await cloudinary.v2.uploader.upload(path, {
                public_id: name
            });

            const aid = await Aids.findById(id);

            if(aid.img.url){
                await cloudinary.v2.uploader.destroy(aid.img.imgId);
            }

            aid.img.imgId = result.public_id;
            aid.img.url = result.secure_url;

            await aid.save();
            fs.unlinkSync(path);
            break;
        case 'promotion':
            result = await cloudinary.v2.uploader.upload(path, {
                public_id: name
            });
            const promotion = await Promotion.findById(id);

            if(promotion.img.url){
                await cloudinary.v2.uploader.destroy(promotion.img.imgId);
            }

            promotion.img.imgId = result.public_id;
            promotion.img.url = result.secure_url;

            await Promotion.findByIdAndUpdate(id, promotion);
            fs.unlinkSync(path);
            break;
        case 'product':
            result = await cloudinary.v2.uploader.upload(path, {
                public_id: name
            });
            const product = await Product.findById(id);

            if(product.img.url){
                await cloudinary.v2.uploader.destroy(product.img.imgId);
            }

            product.img.imgId = result.public_id;
            product.img.url = result.secure_url;

            await product.save();
            fs.unlinkSync(path);
            break;
        case  'pet':
            result = await cloudinary.v2.uploader.upload(path, {
                public_id: name
            });
            const pet = await Pet.findById(id);

            if(pet.img.url){
                await cloudinary.v2.uploader.destroy(pet.img.imgId);
            }

            pet.img.imgId = result.public_id;
            pet.img.url = result.secure_url;

            await pet.save();
            fs.unlinkSync(path);
            break;
        case 'queries':
            switch (type){
                case 'img': case 'pdf':
                    result = await cloudinary.v2.uploader.upload(path, {
                        public_id: name
                    });
                    break;
                case 'video':
                    result = await cloudinary.v2.uploader.upload(path, {
                        resource_type: "video",
                        public_id: name,
                        chunk_size: 6000000,
                    });
                    break;
            }
            const queries = await Queries.findById(id);

            queries.reports.push({
                typeReport: type,
                reportId: result.public_id,
                url: result.secure_url
            });

            await queries.save();
            fs.unlinkSync(path);
            break;
    }
}

const checkExt = (ext, model, type) => {
    const extValid = ['png', 'jpg', 'svg', 'gif', 'jpeg'];
    switch (model){
        case 'queries':
            const extValidVideo = ['mp4', 'avi', 'mkv'];
            if(!extValid.includes(ext)){
                if(!extValidVideo.includes(ext)){
                    if(ext !== 'pdf'){
                        return {type: type,ok: false};
                    }else{
                        type = 'pdf';
                    }
                }else{
                    type = 'video';
                }
            }else{
                type = 'img';
            }
            break;
        default:
            if(!extValid.includes(ext)){
                return {type: type,ok: false};
            }
            break;
    }
    return {type: type,ok: true};
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
        let type = 'img';

        //Comprobamos si es una ext válida
        const end = checkExt(ext, model, type);
        if(!end.ok){
            return res.status(401).json({
                ok: false,
                msg: 'Extensión no permitida'
            });
        }
        type = end.type;

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

            updateImg(path, model, id, name, type);

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
