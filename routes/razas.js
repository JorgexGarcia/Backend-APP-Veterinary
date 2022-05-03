const {Router} = require("express");
const {getRazas,
    getOneRaza,
    createRaza,
    updateRaza,
    deleteRaza} = require('../controllers/razas');
const {check} = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos");
const {validarJWT} = require("../middlewares/validar-JWT");

const router = Router();

router.get('/',
    [
        validarJWT
    ],
    getRazas
);

router.get('/:id',
    [
        validarJWT
    ],
    getOneRaza
);

router.post('/',
    [
        validarJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('type', 'El tipo es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createRaza
);
router.put('/:id',
    [
        validarJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('type', 'El tipo es obligatorio').not().isEmpty(),
        validarCampos
    ],
    updateRaza
);

router.delete('/:id',
    [
        validarJWT
    ],
    deleteRaza
);

module.exports = router;
