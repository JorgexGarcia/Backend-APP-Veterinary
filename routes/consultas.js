const {Router} = require("express");
const {getConsultas, createConsulta} = require('../controllers/consultas');


const router = Router();

router.get('/', getConsultas);
router.post('/', createConsulta);

module.exports = router;
