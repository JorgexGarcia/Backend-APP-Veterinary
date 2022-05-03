const {Router} = require("express");
const {getPets,
    createPet,
    getOnePet,
    deletePet,
    updatePet } = require('../controllers/pets');
const {check} = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos");
const {validarJWT} = require("../middlewares/validar-JWT");


const router = Router();

router.get('/',
    [
        validarJWT
    ],
    getPets
);

router.get('/:id',
    [
        validarJWT
    ],
    getOnePet
);

router.post('/',
    [
        validarJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('birth_date', 'La fecha de nacimiento es obligatoria').not().isEmpty(),
        check('id_user', 'Tiene que tener un usuario asignado').not()
            .isEmpty()
            .isMongoId(),
        check('sex', 'Tienes que indicar el sexo del animal').not().isEmpty(),
        check('sterilized', 'Tienes que indicar si esta esterelizado el animal').not().isEmpty(),
        check('color', 'Tienes que indicar el color del animal').not().isEmpty(),
        check('race', 'Tienes que indicar la raza del animal').not()
            .isEmpty()
            .isMongoId(),
        check('type', 'Tienes que indicar el tipo del animal').not().isEmpty(),
        check('create_Date', 'Tienes que indicar la fecha de creación del animal').not().isEmpty(),
        validarCampos
    ],
    createPet
);

router.put('/:id',
    [
        validarJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('birth_date', 'La fecha de nacimiento es obligatoria').not().isEmpty(),
        check('id_user', 'Tiene que tener un usuario asignado').not()
            .isEmpty()
            .isMongoId(),
        check('sex', 'Tienes que indicar el sexo del animal').not().isEmpty(),
        check('sterilized', 'Tienes que indicar si esta esterelizado el animal').not().isEmpty(),
        check('color', 'Tienes que indicar el color del animal').not().isEmpty(),
        check('race', 'Tienes que indicar la raza del animal').not()
            .isEmpty()
            .isMongoId(),
        check('type', 'Tienes que indicar el tipo del animal').not().isEmpty(),
        check('create_Date', 'Tienes que indicar la fecha de creación del animal').not().isEmpty(),
        validarCampos
    ],
    updatePet
);

router.delete('/:id',
    [
            validarJWT
    ],
    deletePet
);

module.exports = router;
