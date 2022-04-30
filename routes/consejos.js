const {Router} = require("express");
const {getConsejos, getOneConsejo, createConsejo, updateConsejo, deleteConsejo}
    = require('../controllers/consejos');

const router = Router();

router.get('/', getConsejos);
router.get('/:id', getOneConsejo);
router.post('/', createConsejo);
router.put('/:id', updateConsejo);
router.delete('/:id', deleteConsejo);

module.exports = router;
