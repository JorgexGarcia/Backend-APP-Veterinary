const {Router} = require("express");
const {getQueries,
        createQueries,
        getOneQueries,
        updateQueries,
        deleteQueries} = require('../../controllers/models/queries');
const {check} = require("express-validator");
const {checkField} = require('../../middlewares/check-field')
const {checkJWT} = require("../../middlewares/check-JWT");

const router = Router();

router.get('/',
    [
        checkJWT
    ],
    getQueries
);

router.get('/:id',
    [
        checkJWT
    ],
    getOneQueries
);

router.post('/',
    [
        checkJWT,
        check('type', 'El tipo tiene que ser obligatorio').not().isEmpty(),
        check('idPet', 'La id del animal tiene que ser obligatoria').not()
            .isEmpty()
            .isMongoId(),
        check('idUser', 'La id del trabajador tiene que ser obligatoria').not()
            .isEmpty()
            .isMongoId(),
        check('description', 'La descripción tiene que ser obligatoria').not().isEmpty(),
        check('service', 'La id del servicio tiene que ser obligatoria').not()
            .isEmpty()
            .isMongoId(),
        check('date', 'La fecha tiene que ser obligatoria').not().isEmpty(),
        checkField
    ],
    createQueries
);

router.put('/:id',
    [
        checkJWT,
        check('type', 'El tipo tiene que ser obligatorio').not().isEmpty(),
        check('idPet', 'La id del animal tiene que ser obligatoria').not()
            .isEmpty()
            .isMongoId(),
        check('idUser', 'La id del trabajador tiene que ser obligatoria').not()
            .isEmpty()
            .isMongoId(),
        check('description', 'La descripción tiene que ser obligatoria').not().isEmpty(),
        check('service', 'La id del servicio tiene que ser obligatoria').not()
            .isEmpty()
            .isMongoId(),
        check('date', 'La fecha tiene que ser obligatoria').not().isEmpty(),
        checkField
    ],
    updateQueries
);

router.delete('/:id',
    [
        checkJWT
    ],
    deleteQueries
);

module.exports = router;
