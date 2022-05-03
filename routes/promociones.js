const {Router} = require("express");
const {getPromociones, getOnePromocion, createPromocion, updatePromocion, deletePromocion}
    = require('../controllers/promociones');
const {check} = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos");
const {validarJWT} = require("../middlewares/validar-JWT");

const router = Router();

router.get('/',
    [
        validarJWT
    ],
    getPromociones
);

router.get('/:id',
    [
        validarJWT
    ],
    getOnePromocion
);

router.post('/',
    [
        validarJWT,

    ],
    createPromocion
);

router.put('/:id',
    [
        validarJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty,
        check('description', 'La descripción es obligatoria').not().isEmpty,
        check('start_date', 'La fecha de inicio es obligatoria').not().isEmpty,
        check('finish_date', 'La fecha de fin es obligatoria').not().isEmpty,
        validarCampos
    ],
    updatePromocion
);

router.delete('/:id',
    [
        validarJWT
    ],
    deletePromocion
);

module.exports = router;
