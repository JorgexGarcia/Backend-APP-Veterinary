const {Router} = require("express");
const {getTratamientos,
    getOneTratamiento,
    createTratamiento,
    updateTratamiento,
    deleteTratamiento} = require('../controllers/tramientos');
const {check} = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos");

const router = Router();

router.get('/', getTratamientos);

router.get('/:id', getOneTratamiento);

router.post('/',
    [
        check('start_date', 'Se necesita una fecha de inicio').not().isEmpty(),
        check('description', 'Se necesita una descripción').not().isEmpty(),
        check('id_pet', 'Tiene que tener un animal asignado').not()
            .isEmpty()
            .isMongoId(),
        check('id_user', 'Tiene que tener un trabajador asignado').not()
            .isEmpty()
            .isMongoId(),
        check('nombre', 'Tiene que tener un nombre').not().isEmpty(),
        validarCampos
    ],
    createTratamiento
);

router.put('/:id',
    [
        check('start_date', 'Se necesita una fecha de inicio').not().isEmpty(),
        check('description', 'Se necesita una descripción').not().isEmpty(),
        check('id_pet', 'Tiene que tener un animal asignado').not()
            .isEmpty()
            .isMongoId(),
        check('id_user', 'Tiene que tener un trabajador asignado').not()
            .isEmpty()
            .isMongoId(),
        check('nombre', 'Tiene que tener un nombre').not().isEmpty(),
        validarCampos
    ],
    updateTratamiento
);

router.delete('/:id', deleteTratamiento);

module.exports = router;
