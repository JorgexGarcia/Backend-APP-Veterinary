const {Router} = require("express");
const {getUsers, getOneUser, deleteUser,
    createUser,updateUser } = require('../controllers/user');
const {check} = require("express-validator");
const {checkField} = require('../middlewares/check-field')
const {checkJWT} = require("../middlewares/check-JWT");


const router = Router();

router.get('/',
    [
        checkJWT
    ],
    getUsers);

router.get('/:id',
    [
        checkJWT
    ],
    getOneUser
);

router.post(
    '/',
    [
        checkJWT,
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('lastName','Los apellidos son obligatorios').not().isEmpty(),
        check('email','El email no es valido').not().isEmpty().isEmail(),
        check('password','El password es obligatorio').not().isEmpty(),
        check('birthDate','La fecha de nacimiento es obligatorio').not().isEmpty(),
        check('dni','El DNI es obligatorio').not().isEmpty(),
        check('phone','El teléfono es obligatorio').not().isEmpty(),
        check('province','La provincia es obligatorio').not().isEmpty(),
        check('city','La ciudad es obligatorio').not().isEmpty(),
        check('address','La dirección es obligatorio').not().isEmpty(),
        checkField
    ],
    createUser
);

router.put(
    '/:id',
    [
        checkJWT,
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('lastName','Los apellidos son obligatorios').not().isEmpty(),
        check('email','El email no es valido').not().isEmpty().isEmail(),
        check('password','El password es obligatorio').not().isEmpty(),
        check('birthDate','La fecha de nacimiento es obligatorio').not().isEmpty(),
        check('dni','El DNI es obligatorio').not().isEmpty(),
        check('phone','El teléfono es obligatorio').not().isEmpty(),
        check('province','La provincia es obligatorio').not().isEmpty(),
        check('city','La ciudad es obligatorio').not().isEmpty(),
        check('address','La dirección es obligatorio').not().isEmpty(),
        checkField
    ],
    updateUser
);

router.delete('/:id',
    [
        checkJWT
    ],
    deleteUser
);

module.exports = router;
