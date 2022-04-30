const {Router} = require("express");
const {getTratamientos,
    getOneTratamiento,
    createTratamiento,
    updateTratamiento,
    deleteTratamiento} = require('../controllers/tramientos');

const router = Router();

router.get('/', getTratamientos);
router.get('/:id', getOneTratamiento);
router.post('/', createTratamiento);
router.put('/:id', updateTratamiento);
router.delete('/:id', deleteTratamiento);

module.exports = router;
