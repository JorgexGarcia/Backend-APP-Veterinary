const {Router} = require("express");
const {login, renewToken} = require('../../controllers/auth/auth');
const {check} = require("express-validator");
const {checkField} = require('../../middlewares/check-field')
const {checkJWT} = require("../../middlewares/check-JWT");

const router = Router();

router.post('/',
    [
        check('email','El email es obligatorio').not().isEmpty(),
        check('email','El email no es valido').isEmail(),
        check('password','El password es obligatorio').not().isEmpty(),
        checkField
    ],
    login
);

router.get('/renew',
    [
        checkJWT
    ],
    renewToken
);

module.exports = router;
