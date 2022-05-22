const User = require('../../models/user');
const Aids = require('../../models/aids');
const Treatment = require('../../models/treatment');
const Service = require('../../models/service');
const Queries = require('../../models/queries');
const Promotion = require('../../models/promotion');
const Product = require('../../models/product');
const Pet = require('../../models/pet');
const Breed= require('../../models/breed');

const searchAll = async (req,res) =>{

    if(req.user.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    try{

        const part = req.params.part;
        const regx = new RegExp(part, 'i');

        if(!part){
            return res.status(400).json({
                ok: false,
                msg: 'No se encontró nada con ese campo'
            });
        }

        const [user, aids, queries, treatment,
            service, promotion, products, pets, breed] = await Promise.all([
            User.find({name: regx}, 'name img lastName'),
            Aids.find({description: regx}, 'name img'),
            Queries.find({description: regx}, 'description type idPet')
                .populate('idPet', 'name img'),
            Treatment.find({name: regx}, 'name'),
            Service.find({name: regx}, 'name'),
            Promotion.find({name: regx}, 'name img'),
            Product.find({name: regx}, 'name img'),
            Pet.find({name: regx}, 'name img'),
            Breed.find({name: regx}, 'name')
        ])

        res.status(200).json({
            ok: true,
            data: {
                user,
                aids,
                treatment,
                service,
                queries,
                promotion,
                products,
                pets,
                breed
            }
        });


    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado..., llame a su administrador"
        });
    }

}

const searchByModel = async (req,res) =>{

    if(req.user.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    try{

        const part = req.params.part;
        const model = req.params.model;
        const regx = new RegExp(part, 'i');

        let data = [];

        switch (model){
            case 'user':
                data = await User.find({name: regx})
                    .populate('listPets', 'name img' )
                    .populate('promotions', 'name img')
                    .populate('deleteUser', 'name lastName img');
                break;
            case 'aids':
                data = await Aids.find({name: regx})
                    .populate('idUser', 'name lastName img');
                break;
            case 'queries':
                data = await Queries.find({description: regx})
                    .populate('idPet', 'name img')
                    .populate('service', 'name')
                    .populate('treatment', 'name')
                    .populate('idUser', 'name lastName img')
                    .populate('deleteUser', 'name lastName img');
                break;
            case 'treatment':
                data = await Treatment.find({name: regx})
                    .populate('idPet', 'name img')
                    .populate('idUser', 'name lastName img')
                    .populate('deleteUser', 'name lastName img');
                break;
            case 'service':
                data = await Service.find({name: regx})
                    .populate('deleteUser', 'name lastName img');
                break;
            case 'promotion':
                data = await Promotion.find({name: regx})
                    .populate('deleteUser', 'name lastName img');
                break;
            case 'product':
                data = await Product.find({name: regx});
                break;
            case 'pet':
                data = await Pet.find({name: regx})
                    .populate('breed', 'name')
                    .populate('treatment', 'name')
                    .populate('nextQueries', 'type')
                    .populate('queries', 'type')
                    .populate('idUser', 'name lastName img')
                    .populate('deleteUser', 'name lastName img');
                break;
            case 'breed':
                data = await Breed.find({name: regx})
                    .populate('deleteUser', 'name lastName img');
                break;

            default:
                return res.status(400).json({
                    ok: false,
                    msg: 'Modelo no encontrado'
                });
        }

        res.status(200).json({
            ok: true,
            data
        });

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado..., llame a su administrador"
        });
    }

}

module.exports = {
    searchAll,
    searchByModel
}
