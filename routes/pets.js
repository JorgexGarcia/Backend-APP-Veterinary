const {Router} = require("express");
const {getPets,
    createPet,
    getOnePet,
    deletePet,
    updatePet } = require('../controllers/pets');


const router = Router();

router.get('/', getPets);
router.get('/:id', getOnePet);
router.post('/', createPet);
router.put('/:id', updatePet);
router.delete('/:id', deletePet);

module.exports = router;
