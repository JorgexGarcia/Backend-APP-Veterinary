const {Router} = require("express");
const {searchAll, searchByModel} = require('../../controllers/search/search');
const {checkJWT} = require("../../middlewares/check-JWT");

/**
 * Rutas para las búsquedas.
 */

const router = Router();

router.get('/all/:part',
    [
        checkJWT
    ],
    searchAll);

router.get('/model/:model/:part',
    [
        checkJWT
    ],
    searchByModel);

module.exports = router;
