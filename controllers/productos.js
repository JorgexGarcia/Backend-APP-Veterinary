const Producto = require('../modelos/producto');

const getProductos = async (req,res) =>{

    await Producto.find().then( data => {
            res.json({
                ok: true,
                producto: data
            })
    }).catch(error => {
        res.json({
            ok: false,
            error
        })
    });

}

const getOneProducto = async (req,res)=>{

    const id = req.params.id;

    await Producto.findById(id).then( data => {
        res.json({
            ok: true,
            producto: data
        })
    }).catch(error => {
        res.json({
            ok: false,
            error
        })
    });
}

const createProducto = async (req,res) =>{

    const producto = new Producto (req.body);

    await producto.save();

    res.json({
        ok: true,
        producto
    })

}

const updateProducto = async (req,res) =>{

    const id = req.params.id;

    const producto = await Producto.findByIdAndUpdate(id, req.body, {new: true});

    res.json({
        ok: true,
        producto
    })
}

const deleteProducto = async (req,res) =>{

    const id = req.params.id;

    const producto = await Producto.findByIdAndDelete(id);

    res.json({
        ok: true,
        producto
    })
}

module.exports = {
    getProductos,
    getOneProducto,
    createProducto,
    updateProducto,
    deleteProducto
}
