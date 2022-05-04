const {Router} = require("express");
const {getPets,
    createPet,
    getOnePet,
    deletePet,
    updatePet } = require('../../controllers/models/pets');
const {check} = require("express-validator");
const {checkField} = require('../../middlewares/check-field')
const {checkJWT} = require("../../middlewares/check-JWT");


const router = Router();

router.get('/',
    [
        checkJWT
    ],
    getPets
);

router.get('/:id',
    [
        checkJWT
    ],
    getOnePet
);

router.post('/',
    [
        checkJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('birthDate', 'La fecha de nacimiento es obligatoria').not().isEmpty(),
        check('idUser', 'Tiene que tener un usuario asignado').not()
            .isEmpty()
            .isMongoId(),
        check('sex', 'Tienes que indicar el sexo del animal').not().isEmpty(),
        check('sterilized', 'Tienes que indicar si esta esterilizado el animal').not().isEmpty(),
        check('color', 'Tienes que indicar el color del animal').not().isEmpty(),
        check('race', 'Tienes que indicar la raza del animal').not()
            .isEmpty()
            .isMongoId(),
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
        check('idUser', 'Tiene que tener un usuario asignado').not()
            .isEmpty()
            .isMongoId(),
        check('sex', 'Tienes que indicar el sexo del animal').not().isEmpty(),
        check('sterilized', 'Tienes que indicar si esta esterilizado el animal').not().isEmpty(),
        check('color', 'Tienes que indicar el color del animal').not().isEmpty(),
        check('race', 'Tienes que indicar la raza del animal').not()
            .isEmpty()
            .isMongoId(),
        check('type', 'Tienes que indicar el tipo del animal').not().isEmpty(),
        check('createDate', 'Tienes que indicar la fecha de creación del animal').not().isEmpty(),
        checkField
    ],
    updatePet
);

router.delete('/:id',
    [
        checkJWT
    ],
    deletePet
);

module.exports = router;
