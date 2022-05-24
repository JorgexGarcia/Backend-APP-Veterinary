const {Router} = require("express");
const {getAids, getOneAid, createAid, updateAid, deleteAid}
    = require('../../controllers/models/aids');
const {check} = require("express-validator");
const {checkField} = require('../../middlewares/check-field')
const {checkJWT} = require("../../middlewares/check-JWT");


/**
 * Rutas para los consejos
 */
const router = Router();

router.get('/', checkJWT, getAids);

router.get('/:id', checkJWT, getOneAid);

router.post('/',
    [
        checkJWT,
        check('name', 'Tiene que tener un nombre').not().isEmpty(),
        check('description', 'Tiene que tener una descripción').not().isEmpty(),
        check('content', 'Tiene que tener un contenido').not().isEmpty(),
        checkField
    ],
    createAid
);

router.put('/:id',
    [
        checkJWT,
        check('name', 'Tiene que tener un nombre').not().isEmpty(),
        check('description', 'Tiene que tener una descripción').not().isEmpty(),
        check('content', 'Tiene que tener un contenido').not().isEmpty(),
        checkField
    ],
    updateAid
);

router.delete('/:id', checkJWT, deleteAid);

module.exports = router;
