const {Router} = require("express");
const {getUsuarios, getOneUsuarios, deleteUsuario,
    createUsuario,updateUsuario } = require('../controllers/usuarios');
const {validarCampos} = require('../middlewares/validar-campos')
const {check} = require("express-validator");
const {validarJWT} = require("../middlewares/validar-JWT");


const router = Router();

router.get('/',
    [
        validarJWT
    ],
    getUsuarios);

router.get('/:id',
    [
        validarJWT
    ],
    getOneUsuarios
);

router.post(
    '/',
    [
        validarJWT,
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('last_name','Los apellidos son obligatorios').not().isEmpty(),
        check('email','El email no es valido').not().isEmpty().isEmail(),
        check('password','El password es obligatorio').not().isEmpty(),
        check('birth_date','La fecha de nacimiento es obligatorio').not().isEmpty(),
        check('dni','El DNI es obligatorio').not().isEmpty(),
        check('phone','El telefono es obligatorio').not().isEmpty(),
        check('province','La provincia es obligatorio').not().isEmpty(),
        check('city','La ciudad es obligatorio').not().isEmpty(),
        check('address','La dirección es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createUsuario
);

router.put(
    '/:id',
    [
        validarJWT,
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('last_name','Los apellidos son obligatorios').not().isEmpty(),
        check('email','El email no es valido').not().isEmpty().isEmail(),
        check('password','El password es obligatorio').not().isEmpty(),
        check('birth_date','La fecha de nacimiento es obligatorio').not().isEmpty(),
        check('dni','El DNI es obligatorio').not().isEmpty(),
        check('phone','El telefono es obligatorio').not().isEmpty(),
        check('province','La provincia es obligatorio').not().isEmpty(),
        check('city','La ciudad es obligatorio').not().isEmpty(),
        check('address','La dirección es obligatorio').not().isEmpty(),
        validarCampos
    ],
    updateUsuario
);

router.delete('/:id',
    [
            validarJWT
    ],
    deleteUsuario
);

module.exports = router;
