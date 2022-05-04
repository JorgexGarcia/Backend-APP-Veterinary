const {Router} = require("express");
const {getProducts,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct} = require('../controllers/product');
const {check} = require("express-validator");
const {checkField} = require('../middlewares/check-field')
const {checkJWT} = require("../middlewares/check-JWT");

const router = Router();

router.get('/',
    [
        checkJWT
    ],
    getProducts
);

router.get('/:id',
    [
        checkJWT
    ],
    getOneProduct
);

router.post('/',
    [
        checkJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('description', 'La descripción es obligatoria').not().isEmpty(),
        check('quantity', 'La cantidad es obligatoria').not().isEmpty(),
        checkField
    ],
    createProduct
);

router.put('/:id',
    [
        checkJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('description', 'La descripción es obligatoria').not().isEmpty(),
        check('quantity', 'La cantidad es obligatoria').not().isEmpty(),
        checkField
    ],
    updateProduct
);

router.delete('/:id',
    [
        checkJWT
    ],
    deleteProduct
);

module.exports = router;
