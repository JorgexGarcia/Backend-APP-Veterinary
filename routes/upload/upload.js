const {Router} = require("express");
const {fileUpload} = require('../../controllers/upload/upload');
const expressFileUpload = require('express-fileupload');
const {checkJWT} = require("../../middlewares/check-JWT");


const router = Router();

router.use(expressFileUpload());

router.put('/:model/:id',
    [
        checkJWT
    ],
    fileUpload);

module.exports = router;

