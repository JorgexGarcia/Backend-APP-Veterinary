const {Router} = require("express");
const {getTratamientos,
    getOneTratamiento,
    createTratamiento,
    updateTratamiento,
    deleteTratamiento} = require('../controllers/tramientos');
const {check} = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos");
const {validarJWT} = require("../middlewares/validar-JWT");

const router = Router();

router.get('/',
    [
        validarJWT
    ],
    getTratamientos
);

router.get('/:id',
    [
        validarJWT
    ],
    getOneTratamiento
);

router.post('/',
    [
        validarJWT,
        check('start_date', 'Se necesita una fecha de inicio').not().isEmpty(),
        check('description', 'Se necesita una descripción').not().isEmpty(),
        check('id_pet', 'Tiene que tener un animal asignado').not()
            .isEmpty()
            .isMongoId(),
        check('name', 'Tiene que tener un nombre').not().isEmpty(),
        validarCampos
    ],
    createTratamiento
);

router.put('/:id',
    [
        validarJWT,
        check('start_date', 'Se necesita una fecha de inicio').not().isEmpty(),
        check('description', 'Se necesita una descripción').not().isEmpty(),
        check('id_pet', 'Tiene que tener un animal asignado').not()
            .isEmpty()
            .isMongoId(),
        check('name', 'Tiene que tener un nombre').not().isEmpty(),
        validarCampos
    ],
    updateTratamiento
);

router.delete('/:id',
    [
        validarJWT
    ],
    deleteTratamiento
);

module.exports = router;
