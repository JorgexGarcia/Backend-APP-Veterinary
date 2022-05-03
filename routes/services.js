const {Router} = require("express");
const {getServices,
    getOneService,
    createService,
    updateService,
    deleteService} = require('../controllers/services');
const {check} = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos");
const {validarJWT} = require("../middlewares/validar-JWT");

const router = Router();

router.get('/',
    [
    validarJWT
    ],
    getServices
);

router.get('/:id',
    [
        validarJWT
    ],
    getOneService
);

router.post('/',
    [
        validarJWT,
        check('name', 'Tiene que tener un nombre').not().isEmpty(),
        check('description', 'Tiene que tener una descripción').not().isEmpty(),
        check('price', 'Tiene que tener un precio').not().isEmpty(),
        validarCampos
    ],
    createService
);

router.put('/:id',
    [
        validarJWT,
        check('name', 'Tiene que tener un nombre').not().isEmpty,
        check('description', 'Tiene que tener una descripción').not().isEmpty,
        check('price', 'Tiene que tener un precio').not().isEmpty,
        validarCampos
    ],
    updateService
);

router.delete('/:id',
    [
        validarJWT
    ],
    deleteService
);

module.exports = router;
