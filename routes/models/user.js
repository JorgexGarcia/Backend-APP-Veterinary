const {Router} = require("express");
const {getUsers, getOneUser, deleteUser,
    createUser,updateUser, getAllUsers } = require('../../controllers/models/user');
const {check} = require("express-validator");
const {checkField} = require('../../middlewares/check-field')
const {checkJWT} = require("../../middlewares/check-JWT");

/**
 * Rutas para los Usuarios.
 */

const router = Router();

router.get('/all/:active', checkJWT, getUsers);

router.get('/pages/all', checkJWT, getAllUsers);

router.get('/one/:id', checkJWT, getOneUser);

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

router.put('/delete/:id', checkJWT, deleteUser
);

module.exports = router;
