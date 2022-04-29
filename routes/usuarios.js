const {Router} = require("express");
const {getUsuarios, getOneUsuarios, deleteUsuario,
    createUsuario,updateUsuario } = require('../controllers/usuarios');


const router = Router();

router.get('/', getUsuarios);
router.get('/:id', getOneUsuarios);
router.post('/', createUsuario);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);

module.exports = router;
