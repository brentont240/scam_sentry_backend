/*******************************************
 * These routes are for:
 *    the guru detector tool
 *    
 *******************************************/

const path = require("path");
const express = require("express");
const router = express.Router();

const emailDetectorController = require("../controllers/guruDetector");

const bodyParser = require("body-parser");

router.post('/guru-detector', emailDetectorController.checkGuru);

module.exports = router;