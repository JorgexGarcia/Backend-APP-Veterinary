const {Router} = require("express");
const {getPromotions, getOnePromotion, createPromotion, updatePromotion, deletePromotion, getAllPromotions}
    = require('../../controllers/models/promotion');
const {check} = require('express-validator');
const {checkField} = require('../../middlewares/check-field')
const {checkJWT} = require("../../middlewares/check-JWT");

/**
 * Rutas para las promociones.
 */

const router = Router();

router.get('/all/:active', checkJWT, getPromotions);

router.get('/pages/all', checkJWT, getAllPromotions);

router.get('/one/:id', checkJWT, getOnePromotion);

router.post('/',
    [
        checkJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('description', 'La descripción es obligatoria').not().isEmpty(),
        check('startDate', 'La fecha de inicio es obligatoria').not().isEmpty(),
        check('finishDate', 'La fecha de fin es obligatoria').not().isEmpty(),
        checkField
    ],
    createPromotion
);

router.put('/:id',
    [
        checkJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('description', 'La descripción es obligatoria').not().isEmpty(),
        check('startDate', 'La fecha de inicio es obligatoria').not().isEmpty(),
        check('finishDate', 'La fecha de fin es obligatoria').not().isEmpty(),
        checkField
    ],
    updatePromotion
);

router.put('/delete/:id', checkJWT, deletePromotion);

module.exports = router;
