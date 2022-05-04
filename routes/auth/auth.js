const {Router} = require("express");
const {login} = require('../../controllers/auth/auth');
const {check} = require("express-validator");
const {checkField} = require('../../middlewares/check-field')

const router = Router();

router.post('/',
    [
        check('email','El email es obligatorio').not().isEmpty(),
        check('email','El email no es valido').isEmail(),
        check('password','El password es obligatorio').not().isEmpty(),
        checkField
    ],
    login );

module.exports = router;
