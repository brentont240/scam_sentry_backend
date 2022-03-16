/*******************************************
 * These routes are for:
 *    the MLM detector tool
 *    
 *******************************************/

const path = require("path");
const express = require("express");
const router = express.Router();

const mlmDetectorController = require("../controllers/mlmDetector");

const bodyParser = require("body-parser");

router.post('/mlm-detector', mlmDetectorController.checkCompany);
// for testing, remove this when done!!!
router.get('/mlm-detector', mlmDetectorController.test)

module.exports = router;