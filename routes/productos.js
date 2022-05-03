const {Router} = require("express");
const {getProductos,
    getOneProducto,
    createProducto,
    updateProducto,
    deleteProducto} = require('../controllers/productos');
const {check} = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos");
const {validarJWT} = require("../middlewares/validar-JWT");

const router = Router();

router.get('/',
    [
        validarJWT
    ],
    getProductos
);

router.get('/:id',
    [
        validarJWT
    ],
    getOneProducto
);

router.post('/',
    [
        validarJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('description', 'La descripción es obligatoria').not().isEmpty(),
        check('quantity', 'La cantidad es obligatoria').not().isEmpty(),
        validarCampos
    ],
    createProducto
);

router.put('/:id',
    [
        validarJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('description', 'La descripción es obligatoria').not().isEmpty(),
        check('quantity', 'La cantidad es obligatoria').not().isEmpty(),
        validarCampos
    ],
    updateProducto
);

router.delete('/:id',
    [
        validarJWT
    ],
    deleteProducto
);

module.exports = router;
