const {Router} = require("express");
const {getConsultas,
        createConsulta,
        getOneConsulta,
        updateConsulta,
        deleteConsulta} = require('../controllers/consultas');
const {check} = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos");
const {validarJWT} = require("../middlewares/validar-JWT");

const router = Router();

router.get('/',
    [
        validarJWT
    ],
    getConsultas
);

router.get('/:id',
    [
            validarJWT
    ],
    getOneConsulta
);

router.post('/',
    [
        validarJWT,
        check('type', 'El tipo tiene que ser obligatorio').not().isEmpty(),
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
        check('date', 'La fecha tiene que ser obligatoria').not().isEmpty(),
        validarCampos
    ],
    createConsulta
);

router.put('/:id',
    [
        validarJWT,
        check('type', 'El tipo tiene que ser obligatorio').not().isEmpty(),
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
        check('date', 'La fecha tiene que ser obligatoria').not().isEmpty(),
        validarCampos
    ],
    updateConsulta
);

router.delete('/:id',
    [
        validarJWT
    ],
    deleteConsulta
);

module.exports = router;
