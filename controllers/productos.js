const Producto = require('../modelos/producto');

const getProductos = async (req,res) =>{

    try{

        await Producto.find().then( productos => {
            res.status(200).json({
                ok: true,
                msg: "Listado de productos",
                productos
            })
        });


    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

const getOneProducto = async (req,res)=>{

    const id = req.params.id;

    try{

        await Producto.findById(id).then( producto => {
            res.json({
                ok: true,
                msg: "Producto",
                producto
            });
        });

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

const createProducto = async (req,res) =>{

    try{

        const producto = new Producto (req.body);

        await producto.save();

        res.status(201).json({
            ok: true,
            msg: 'Producto creada',
            producto
        })

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

const updateProducto = async (req,res) =>{

    const id = req.params.id;

    try{

        await Producto.findByIdAndUpdate(id, req.body, {new: true})
            .then( producto => {
                res.status(201).json({
                    ok: true,
                    msg: 'Producto actualizado',
                    producto
                })
            });

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

const deleteProducto = async (req,res) =>{

    const id = req.params.id;

    try{

        await Producto.findByIdAndDelete(id).then( producto => {
            res.status(201).json({
                ok: true,
                msg: 'Producto eliminado',
                producto
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
    getProductos,
    getOneProducto,
    createProducto,
    updateProducto,
    deleteProducto
}
