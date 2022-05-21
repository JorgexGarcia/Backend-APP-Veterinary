const {Router} = require("express");
const {getQueries,
        createQueries,
        getOneQueries,
        updateQueries,
        getAllQueries,
        deleteQueries} = require('../../controllers/models/queries');
const {check} = require("express-validator");
const {checkField} = require('../../middlewares/check-field')
const {checkJWT} = require("../../middlewares/check-JWT");

const router = Router();

router.get('/all/:active', checkJWT, getQueries);

router.get('/pages/all', checkJWT, getAllQueries);

router.get('/one/:id', checkJWT, getOneQueries);

router.post('/',
    [
        checkJWT,
        check('type', 'El tipo tiene que ser obligatorio').not().isEmpty(),
        check('description', 'La descripción tiene que ser obligatoria').not().isEmpty(),
        check('startDate', 'La fecha tiene que ser obligatoria').not().isEmpty(),
        checkField
    ],
    createQueries
);

router.put('/:id',
    [
        checkJWT,
        check('type', 'El tipo tiene que ser obligatorio').not().isEmpty(),
        check('description', 'La descripción tiene que ser obligatoria').not().isEmpty(),
        check('startDate', 'La fecha tiene que ser obligatoria').not().isEmpty(),
        checkField
    ],
    updateQueries
);

router.put('/delete/:id', checkJWT, deleteQueries);

module.exports = router;
