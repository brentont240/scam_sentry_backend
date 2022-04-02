/*******************************************
 * These routes are for:
 *    the guru detector tool
 *    
 *******************************************/

const path = require("path");
const express = require("express");
const router = express.Router();

const guruDetectorController = require("../controllers/guruDetector");

const bodyParser = require("body-parser");

router.post('/guru-detector', guruDetectorController.checkGuru);
router.post('/request-guru', guruDetectorController.requestGuru);

module.exports = router;