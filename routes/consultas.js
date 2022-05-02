const {Router} = require("express");
const {getConsultas,
        createConsulta,
        getOneConsulta,
        updateConsulta,
        deleteConsulta} = require('../controllers/consultas');
const {check} = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos");

const router = Router();

router.get('/', getConsultas);

router.get('/:id', getOneConsulta);

router.post('/',
    [
        check('tipo', 'El tipo tiene que ser obligatorio').not().isEmpty(),
        check('id_pet', 'La id del animal tiene que ser obligatoria').not()
            .isEmpty()
            .isMongoId(),
        check('id_user', 'La id del trabajador tiene que ser obligatoria').not()
            .isEmpty()
            .isMongoId(),
        check('description', 'La descripción tiene que ser obligatoria').not().isEmpty(),
        check('service', 'La id del servicio tiene que ser obligatoria').not()
            .isEmpty()
            .isMongoId(),
        check('treatment', 'La id del tratamiento tiene que ser válida').not()
            .isMongoId(),
        check('date', 'La fecha tiene que ser obligatoria').not().isEmpty(),
        validarCampos
    ],
    createConsulta
);

router.put('/:id',
    [
        check('tipo', 'El tipo tiene que ser obligatorio').not().isEmpty(),
        check('id_pet', 'La id del animal tiene que ser obligatoria').not()
            .isEmpty()
            .isMongoId(),
        check('id_user', 'La id del trabajador tiene que ser obligatoria').not()
            .isEmpty()
            .isMongoId(),
        check('description', 'La descripción tiene que ser obligatoria').not().isEmpty(),
        check('service', 'La id del servicio tiene que ser obligatoria').not()
            .isEmpty()
            .isMongoId(),
        check('treatment', 'La id del tratamiento tiene que ser válida').not()
            .isMongoId(),
        check('date', 'La fecha tiene que ser obligatoria').not().isEmpty(),
        validarCampos
    ],
    updateConsulta
);

router.delete('/:id', deleteConsulta);

module.exports = router;
