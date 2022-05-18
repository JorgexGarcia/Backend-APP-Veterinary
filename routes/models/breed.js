const {Router} = require("express");
const {getBreeds,
    getOneBreed,
    createBreed,
    updateBreed,
    getAllBreeds,
    deleteBreed} = require('../../controllers/models/breed');
const {check} = require("express-validator");
const {checkField} = require('../../middlewares/check-field')
const {checkJWT} = require("../../middlewares/check-JWT");

const router = Router();

router.get('/all/:active', checkJWT, getBreeds);

router.get('/pages/all', checkJWT, getAllBreeds);

router.get('/one/:id', checkJWT, getOneBreed);

router.post('/',
    [
        checkJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('type', 'El tipo es obligatorio').not().isEmpty(),
        checkField
    ],
    createBreed
);
router.put('/:id',
    [
        checkJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('type', 'El tipo es obligatorio').not().isEmpty(),
        checkField
    ],
    updateBreed
);

router.put('/delete/:id', checkJWT, deleteBreed);

module.exports = router;
