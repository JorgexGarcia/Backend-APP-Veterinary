const {Router} = require("express");
const {getPets,
    createPet,
    getOnePet,
    deletePet,
    getAllPets,
    updatePet } = require('../../controllers/models/pets');
const {check} = require("express-validator");
const {checkField} = require('../../middlewares/check-field')
const {checkJWT} = require("../../middlewares/check-JWT");

/**
 * Rutas para las mascotas.
 */

const router = Router();

router.get('/all/:active',checkJWT, getPets);

router.get('/page/all',checkJWT, getAllPets);

router.get('/one/:id', checkJWT, getOnePet);

router.post('/',
    [
        checkJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('birthDate', 'La fecha de nacimiento es obligatoria').not().isEmpty(),
        check('sex', 'Tienes que indicar el sexo del animal').not().isEmpty(),
        check('sterilized', 'Tienes que indicar si esta esterilizado el animal').not().isEmpty(),
        check('color', 'Tienes que indicar el color del animal').not().isEmpty(),
        check('type', 'Tienes que indicar el tipo del animal').not().isEmpty(),
        check('createDate', 'Tienes que indicar la fecha de creación del animal').not().isEmpty(),
        checkField
    ],
    createPet
);

router.put('/:id',
    [
        checkJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('birthDate', 'La fecha de nacimiento es obligatoria').not().isEmpty(),
        check('sex', 'Tienes que indicar el sexo del animal').not().isEmpty(),
        check('sterilized', 'Tienes que indicar si esta esterilizado el animal').not().isEmpty(),
        check('color', 'Tienes que indicar el color del animal').not().isEmpty(),
        check('type', 'Tienes que indicar el tipo del animal').not().isEmpty(),
        check('createDate', 'Tienes que indicar la fecha de creación del animal').not().isEmpty(),
        checkField
    ],
    updatePet
);

router.put('/delete/:id', checkJWT, deletePet);

module.exports = router;
