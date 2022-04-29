const {Router} = require("express");
const {getUsuarios, createUsuario} = require('../controllers/usuarios');


const router = Router();

router.get('/', getUsuarios);
router.post('/', createUsuario);

module.exports = router;
