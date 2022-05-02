const {Router} = require("express");
const {getProductos,
    getOneProducto,
    createProducto,
    updateProducto,
    deleteProducto} = require('../controllers/productos');
const {check} = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos");

const router = Router();

router.get('/', getProductos);

router.get('/:id', getOneProducto);

router.post('/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('description', 'La descripción es obligatoria').not().isEmpty(),
        check('quantity', 'La cantidad es obligatoria').not().isEmpty(),
        validarCampos
    ],
    createProducto
);

router.put('/:id',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('description', 'La descripción es obligatoria').not().isEmpty(),
        check('quantity', 'La cantidad es obligatoria').not().isEmpty(),
        validarCampos
    ],
    updateProducto
);

router.delete('/:id', deleteProducto);

module.exports = router;
