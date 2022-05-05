const {Router} = require("express");
const {fileUpload} = require('../../controllers/upload/upload');
const {checkJWT} = require("../../middlewares/check-JWT");
const expressFileUpload = require('express-fileupload');


const router = Router();

router.use(expressFileUpload());

router.put('/:model/:id',
    [
        checkJWT
    ],
    fileUpload);

module.exports = router;

