/*******************************************
 * These routes are for:
 *    the guru detector tool
 *    
 *******************************************/

const path = require("path");
const express = require("express");
const router = express.Router();

const mlmDetectorController = require("../controllers/mlmDetector");

const bodyParser = require("body-parser");

router.post('/mlm-detector', mlmDetectorController.checkMlm);

module.exports = router;