/*******************************************
 * These controller functions are for:
 *    Detecting if an entered person is a fake guru
 *    or if a website is part of a get rich quick scheme
 *******************************************/
 const req = require("express/lib/request");
const Fake_Gurus = require("../models/fakeGurus");
 const Request_Gurus = require("../models/requestGurus");
 let matchFound = false;

exports.checkGuru = (req, res, next) => {
    let userInput = (req.body.input).toLowerCase();
    // console.log(userInput);
    let gurus = [];
    let websites = [];
    Fake_Gurus.find()
    .then((databaseList) => {
      databaseList.forEach((guru) => {
        gurus.push(guru.guru_name);
        guru.websites.forEach((website) => {
            websites.push(website);
        });
      });
      const websiteMatch = checkMatch(userInput, websites);
      const guruMatch = checkMatch(userInput, gurus);

      res.status(200).json({matchFound, websiteMatch, guruMatch});
    })
    .catch((err) => {
      console.log(err);
    });
};

// create a new request for a guru / website (or both)
exports.requestGuru = (req, res, next) => {
  const guru = new Request_Gurus({
    submissionTime: Date.now(),
    website: req.body.website.toLowerCase(),
    guru_name: req.body.guru_name.toLowerCase(),
  });
  res.status(200).json({message: "Success!"});
  return guru.save();
}

function checkMatch(input, source){
    let match = null;
    source.forEach((keyword) => {
      // need to check if null, can't do toLowerCase on null
      if (keyword != null && input.includes(keyword.toLowerCase())) {
        match = keyword;
        matchFound = true;
        return match;
      }
    });
    return match;
}