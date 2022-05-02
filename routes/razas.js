const {Router} = require("express");
const {getRazas,
    getOneRaza,
    createRaza,
    updateRaza,
    deleteRaza} = require('../controllers/razas');
const {check} = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos");

const router = Router();

router.get('/', getRazas);

router.get('/:id', getOneRaza);

router.post('/',[
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('tipo', 'El tipo es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createRaza
);
router.put('/:id',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('tipo', 'El tipo es obligatorio').not().isEmpty(),
        validarCampos
    ],
    updateRaza
);

router.delete('/:id', deleteRaza);

module.exports = router;
