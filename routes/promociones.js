const {Router} = require("express");
const {getPromociones, getOnePromocion, createPromocion, updatePromocion, deletePromocion}
    = require('../controllers/promociones');
const {check} = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos");

const router = Router();

router.get('/', getPromociones);

router.get('/:id', getOnePromocion);

router.post('/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty,
        check('description', 'La descripción es obligatoria').not().isEmpty,
        check('start_date', 'La fecha de inicio es obligatoria').not().isEmpty,
        check('finish_date', 'La fecha de fin es obligatoria').not().isEmpty,
        validarCampos
    ],
    createPromocion
);

router.put('/:id',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty,
        check('description', 'La descripción es obligatoria').not().isEmpty,
        check('start_date', 'La fecha de inicio es obligatoria').not().isEmpty,
        check('finish_date', 'La fecha de fin es obligatoria').not().isEmpty,
        validarCampos
    ],
    updatePromocion
);

router.delete('/:id', deletePromocion);

module.exports = router;
