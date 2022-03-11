/*******************************************
 * These controller functions are for:
 *    Detecting if an entered person is a fake guru
 *    or if a website is part of a get rich quick scheme
 *******************************************/
 const Fake_Gurus = require("../models/fakeGurus");
 let matchFound = false;

exports.checkGuru = (req, res, next) => {
    let userInput = (req.body.input).toLowerCase();
    console.log(userInput);
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
    //   TODO: get this to work!!!
      const websiteMatch = checkMatch(userInput, websites);
      const guruMatch = checkMatch(userInput, gurus);

      // if(websiteMatch != null){
      //   matchFound = true;
      //   res.status(200).json({ matchFound, websiteMatch });
      // } else if (guruMatch != null){
      //   matchFound = true;
      //   res.status(200).json({ matchFound, guruMatch });
      // } else

      // if (websiteMatch != null || guruMatch != null)
      //   matchFound = true;
        // res.status(200).json({ gurus, websites });
        // res.status(200).json({ websiteMatch, guruMatch });
        res.status(200).json({matchFound, websiteMatch, guruMatch});
        // res.status(200).json({matchFound, websiteMatch});
    })
    .catch((err) => {
      console.log(err);
    });
};

// FIXME: get this to work
function checkMatch(input, source){
    let match = null;
    source.forEach((keyword) => {
      if (keyword != null && input.includes(keyword.toLowerCase())) {
        match = keyword;
        matchFound = true;
        return match;
        // break;
      }
    });
    // if(match !== ""){
    //     return match;
    // }
    // else return "";
    return match;
}