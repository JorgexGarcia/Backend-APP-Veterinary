const {Router} = require("express");
const {getServices,
    getOneService,
    createService,
    updateService,
    deleteService} = require('../controllers/services');
const {check} = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos");

const router = Router();

router.get('/', getServices);

router.get('/:id', getOneService);

router.post('/',
    [
        check('name', 'Tiene que tener un nombre').not().isEmpty,
        check('description', 'Tiene que tener una descripción').not().isEmpty,
        check('price', 'Tiene que tener un precio').not().isEmpty,
        validarCampos
    ],
    createService
);

router.put('/:id',
    [
        check('name', 'Tiene que tener un nombre').not().isEmpty,
        check('description', 'Tiene que tener una descripción').not().isEmpty,
        check('price', 'Tiene que tener un precio').not().isEmpty,
        validarCampos
    ],
    updateService
);

router.delete('/:id', deleteService);

module.exports = router;
