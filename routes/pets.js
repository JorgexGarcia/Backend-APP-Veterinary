const {Router} = require("express");
const {getPets,
    createPet,
    getOnePet,
    deletePet,
    updatePet } = require('../controllers/pets');
const {check} = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos");


const router = Router();

router.get('/', getPets);

router.get('/:id', getOnePet);

router.post('/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('birth_date', 'La fecha de nacimiento es obligatoria').not().isEmpty(),
        check('id_user', 'Tiene que tener un usuario asignado').not()
            .isEmpty()
            .isMongoId(),
        check('sex', 'Tienes que indicar el sexo del animal').not().isEmpty(),
        check('sterilized', 'Tienes que indicar si esta esterelizado el animal').not().isEmpty(),
        check('color', 'Tienes que indicar el color del animal').not().isEmpty(),
        check('raza', 'Tienes que indicar la raza del animal').not()
            .isEmpty()
            .isMongoId(),
        check('tipo', 'Tienes que indicar el tipo del animal').not().isEmpty(),
        check('consultas', 'Tienes que ser una id válida').not()
            .isMongoId(),
        check('next_consulta', 'Tienes que ser una id válida').not()
            .isMongoId(),
        check('treatment', 'Tienes que ser una id válida').not()
            .isMongoId(),
        check('create_Date', 'Tienes que indicar la fecha de creación del animal').not().isEmpty(),
        validarCampos
    ],
    createPet
);

router.put('/:id',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('birth_date', 'La fecha de nacimiento es obligatoria').not().isEmpty(),
        check('id_user', 'Tiene que tener un usuario asignado').not()
            .isEmpty()
            .isMongoId(),
        check('sex', 'Tienes que indicar el sexo del animal').not().isEmpty(),
        check('sterilized', 'Tienes que indicar si esta esterelizado el animal').not().isEmpty(),
        check('color', 'Tienes que indicar el color del animal').not().isEmpty(),
        check('raza', 'Tienes que indicar la raza del animal').not()
            .isEmpty()
            .isMongoId(),
        check('tipo', 'Tienes que indicar el tipo del animal').not().isEmpty(),
        check('consultas', 'Tienes que ser una id válida').not()
            .isMongoId(),
        check('next_consulta', 'Tienes que ser una id válida').not()
            .isMongoId(),
        check('treatment', 'Tienes que ser una id válida').not()
            .isMongoId(),
        check('create_Date', 'Tienes que indicar la fecha de creación del animal').not().isEmpty(),
        validarCampos
    ],
    updatePet
);

router.delete('/:id', deletePet);

module.exports = router;
