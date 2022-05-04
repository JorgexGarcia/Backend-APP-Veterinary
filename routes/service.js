const {Router} = require("express");
const {getServices,
    getOneService,
    createService,
    updateService,
    deleteService} = require('../controllers/service');
const {check} = require("express-validator");
const {checkField} = require('../middlewares/check-field')
const {checkJWT} = require("../middlewares/check-JWT");

const router = Router();

router.get('/',
    [
        checkJWT
    ],
    getServices
);

router.get('/:id',
    [
        checkJWT
    ],
    getOneService
);

router.post('/',
    [
        checkJWT,
        check('name', 'Tiene que tener un nombre').not().isEmpty(),
        check('description', 'Tiene que tener una descripción').not().isEmpty(),
        check('price', 'Tiene que tener un precio').not().isEmpty(),
        checkField
    ],
    createService
);

router.put('/:id',
    [
        checkJWT,
        check('name', 'Tiene que tener un nombre').not().isEmpty,
        check('description', 'Tiene que tener una descripción').not().isEmpty,
        check('price', 'Tiene que tener un precio').not().isEmpty,
        checkField
    ],
    updateService
);

router.delete('/:id',
    [
        checkJWT
    ],
    deleteService
);

module.exports = router;
