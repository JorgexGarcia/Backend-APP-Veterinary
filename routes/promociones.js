const {Router} = require("express");
const {getPromociones, getOnePromocion, createPromocion, updatePromocion, deletePromocion}
    = require('../controllers/promociones');

const router = Router();

router.get('/', getPromociones);
router.get('/:id', getOnePromocion);
router.post('/', createPromocion);
router.put('/:id', updatePromocion);
router.delete('/:id', deletePromocion);

module.exports = router;
