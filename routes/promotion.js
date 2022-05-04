const {Router} = require("express");
const {getPromotions, getOnePromotion, createPromotion, updatePromotion, deletePromotion}
    = require('../controllers/promotion');
const {check} = require("express-validator");
const {checkField} = require('../middlewares/check-field')
const {checkJWT} = require("../middlewares/check-JWT");

const router = Router();

router.get('/',
    [
        checkJWT
    ],
    getPromotions
);

router.get('/:id',
    [
        validarJWT
    ],
    getOnePromotion
);

router.post('/',
    [
        checkJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty,
        check('description', 'La descripción es obligatoria').not().isEmpty,
        check('start_date', 'La fecha de inicio es obligatoria').not().isEmpty,
        check('finish_date', 'La fecha de fin es obligatoria').not().isEmpty,
        checkField
    ],
    createPromotion
);

router.put('/:id',
    [
        checkJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty,
        check('description', 'La descripción es obligatoria').not().isEmpty,
        check('start_date', 'La fecha de inicio es obligatoria').not().isEmpty,
        check('finish_date', 'La fecha de fin es obligatoria').not().isEmpty,
        checkField
    ],
    updatePromotion
);

router.delete('/:id',
    [
        checkJWT
    ],
    deletePromotion
);

module.exports = router;
