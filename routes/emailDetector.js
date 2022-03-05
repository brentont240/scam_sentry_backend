/*******************************************
 * These routes are for:
 *    the scam email detector tool
 *    
 *******************************************/

const path = require("path");
const express = require("express");
const router = express.Router();

const emailDetectorController = require("../controllers/emailDetector");

const bodyParser = require("body-parser");

router.post('/email-detector', emailDetectorController.checkEmail);

module.exports = router;