const {Router} = require("express");
const {getServices,
    getOneService,
    createService,
    updateService,
    getAllServices,
    deleteService} = require('../../controllers/models/service');
const {check} = require("express-validator");
const {checkField} = require('../../middlewares/check-field')
const {checkJWT} = require("../../middlewares/check-JWT");

const router = Router();

router.get('/all/:active', checkJWT, getServices);

router.get('/one/:id', checkJWT, getOneService);

router.get('/page/all', checkJWT, getAllServices);

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
        check('name').not().isEmpty().withMessage('Tiene que tener un nombre'),
        check('description', 'Tiene que tener una descripción').not().isEmpty(),
        check('price', 'Tiene que tener un precio').not().isEmpty(),
        checkField
    ],
    updateService
);

router.put('/delete/:id', checkJWT, deleteService);

module.exports = router;
