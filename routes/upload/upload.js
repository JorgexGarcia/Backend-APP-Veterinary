const {Router} = require("express");
const {fileUpload} = require('../../controllers/upload/upload');
const {checkJWT} = require("../../middlewares/check-JWT");


const router = Router();

router.put('/:model/:id',
    [
        checkJWT
    ],
    fileUpload);

module.exports = router;

