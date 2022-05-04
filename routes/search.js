const {Router} = require("express");
const {searchAll, searchByModel} = require('../controllers/search');
const {checkJWT} = require("../middlewares/check-JWT");


const router = Router();

router.get('/:part',
    [
        checkJWT
    ],
    searchAll);

router.get('/model/:model/:part',
    [
        checkJWT
    ],
    searchByModel);

router.get('/',
    [
        checkJWT
    ],
    searchAll);

module.exports = router;
