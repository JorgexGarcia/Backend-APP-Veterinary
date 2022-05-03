const {Router} = require("express");
const {getConsejos, getOneConsejo, createConsejo, updateConsejo, deleteConsejo}
    = require('../controllers/consejos');
const {check} = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos");
const {validarJWT} = require("../middlewares/validar-JWT");

const router = Router();

router.get('/',
    [
        validarJWT
    ],
    getConsejos
);

router.get('/:id',
    [
        validarJWT
    ],
    getOneConsejo
);

router.post('/',
    [
        validarJWT,
        check('description', 'Tiene que tener una descripción').not().isEmpty(),
        check('content', 'Tiene que tener un contenido').not().isEmpty(),
        check('id_user', 'Tiene que tener un trabajador asignado').not()
            .isEmpty()
            .isMongoId(),
        validarCampos
    ],
    createConsejo
);

router.put('/:id',
    [
        validarJWT,
        check('description', 'Tiene que tener una descripción').not().isEmpty(),
        check('content', 'Tiene que tener un contenido').not().isEmpty(),
        check('id_user', 'Tiene que tener un trabajador asignado').not()
            .isEmpty()
            .isMongoId(),
        validarCampos
    ],
    updateConsejo
);

router.delete('/:id',
    [
        validarJWT
    ],
    deleteConsejo
);

module.exports = router;
