const {Router} = require("express");
const {getConsultas, createConsulta, getOneConsulta, updateConsulta, deleteConsulta} = require('../controllers/consultas');

const router = Router();

router.get('/', getConsultas);
router.get('/:id', getOneConsulta);
router.post('/', createConsulta);
router.put('/:id', updateConsulta);
router.delete('/:id', deleteConsulta);

module.exports = router;
