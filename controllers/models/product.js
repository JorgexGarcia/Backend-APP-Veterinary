const Product = require('../../models/product');

/**
 * Método para obtener el listado de productos.
 *  - Si eres Usuario no puedes acceder al método.
 */
const getProducts = async (req,res) =>{

    if(req.user.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    try{

        const active = req.params.active || true;

        const from = (Number(req.query.page) || 0) * 5;

        const [data , total] = await Promise.all([
            Product.find({active: active})
                .populate('deleteUser', 'name lastName img')
                .skip( from )
                .limit(5),

            Product.countDocuments({active: active})
        ]);

        res.status(200).json({
            ok: true,
            msg: "Listado de productos",
            data,
            total
        });

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

/**
 * Método para obtener un producto.
 *  - Si eres Usuario no puedes acceder al método.
 */
const getOneProduct = async (req,res)=>{

    if(req.user.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    const id = req.params.id;

    try{

        await Product.findById(id)
            .populate('deleteUser', 'name lastName img')
            .then( data => {
            res.status(200).json({
                ok: true,
                msg: "Producto",
                data
            });
        });

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

/**
 * Método para crear un producto.
 *  - Si eres Usuario no puedes acceder al método.
 */
const createProduct = async (req,res) =>{

    if(req.user.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    try{

        const product = new Product(req.body);

        //Imagen por defecto
        if(!req.body.img){
            product.img = {
                imgId: 'Null',
                url: 'https://res.cloudinary.com/app-veterinary/image/upload/v1651750342/no-img.jpg'
            }
        }

        await product.save();

        res.status(201).json({
            ok: true,
            msg: 'Producto creada',
            data: product
        })

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

/**
 * Método para actualizar un producto.
 *  - Si eres Usuario no puedes acceder al método.
 */
const updateProduct = async (req,res) =>{

    if(req.user.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    const id = req.params.id;

    try{

        //Elementos que no se pueden actualizar
        const {deleteDate, deleteUser, deleteReason, ...fields} = req.body;

        await Product.findByIdAndUpdate(id, fields, {new: true})
            .then( data => {
                res.status(201).json({
                    ok: true,
                    msg: 'Producto actualizado',
                    data
                })
            });

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

/**
 * Método para eliminar un producto.
 *  - Si eres Usuario no puedes acceder al método.
 *  - No eliminamos el producto, lo marcamos como no activo, guardamos la fecha,
 *      el motivo y el usuario que lo desea eliminar.
 */
const deleteProduct = async (req,res) =>{

    if(req.user.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    const id = req.params.id;

    try{

        const data = await Product.findById(id);

        if(!data){
            res.status(404).json({
                ok: false,
                msg: "No se encontró el producto"
            });
        }

        data.active = false;
        data.deleteDate = Date.now();
        data.deleteReason = req.body.reason || 'Sin motivo';
        data.deleteUser = req.user.id;

        await Product.findByIdAndUpdate(id, data, {new: true})
            .then( data => {
            res.status(201).json({
                ok: true,
                msg: 'Producto eliminado',
                data
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
    getProducts,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct
}
