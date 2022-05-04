const {Router} = require("express");
const {getAids, getOneAid, createAid, updateAid, deleteAid}
    = require('../controllers/aids');
const {check} = require("express-validator");
const {checkField} = require('../middlewares/check-field')
const {checkJWT} = require("../middlewares/check-JWT");

const router = Router();

router.get('/',
    [
        checkJWT
    ],
    getAids
);

router.get('/:id',
    [
        checkJWT
    ],
    getOneAid
);

router.post('/',
    [
        checkJWT,
        check('description', 'Tiene que tener una descripción').not().isEmpty(),
        check('content', 'Tiene que tener un contenido').not().isEmpty(),
        checkField
    ],
    createAid
);

router.put('/:id',
    [
        checkJWT,
        check('description', 'Tiene que tener una descripción').not().isEmpty(),
        check('content', 'Tiene que tener un contenido').not().isEmpty(),
        checkField
    ],
    updateAid
);

router.delete('/:id',
    [
        checkJWT
    ],
    deleteAid
);

module.exports = router;
