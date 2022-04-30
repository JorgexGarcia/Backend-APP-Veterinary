const {Router} = require("express");
const {getServices,
    getOneService,
    createService,
    updateService,
    deleteService} = require('../controllers/services');

const router = Router();

router.get('/', getServices);
router.get('/:id', getOneService);
router.post('/', createService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

module.exports = router;
