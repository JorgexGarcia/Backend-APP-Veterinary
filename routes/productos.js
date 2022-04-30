const {Router} = require("express");
const {getProductos,
    getOneProducto,
    createProducto,
    updateProducto,
    deleteProducto} = require('../controllers/productos');

const router = Router();

router.get('/', getProductos);
router.get('/:id', getOneProducto);
router.post('/', createProducto);
router.put('/:id', updateProducto);
router.delete('/:id', deleteProducto);

module.exports = router;
