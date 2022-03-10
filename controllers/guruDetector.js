/*******************************************
 * These controller functions are for:
 *    Detecting if an entered person is a fake guru
 *    or if a website is part of a get rich quick scheme
 *******************************************/
 const Fake_Gurus = require("../models/fakeGurus");

exports.checkGuru = (req, res, next) => {
    let userInput = (req.body.input).toLowerCase();
    console.log(userInput);
    let gurus = [];
    let websites = [];
    let matchFound = false;
    Fake_Gurus.find()
    .then((databaseList) => {
      databaseList.forEach((guru) => {
        gurus.push(guru.guru_name);
        guru.websites.forEach((website) => {
            websites.push(website);
        });
      });
    //   TODO: get this to work!!!
      //  let websiteMatch = checkMatch(userInput, websites);
      //  let guruMatch = checkMatch(userInput, gurus);

    //   if(websiteMatch !== ""){
    //     matchFound = true;
    //     res.status(200).json({ matchFound, websiteMatch });
    //   } else if (guruMatch !== ""){
    //     matchFound = true;
    //     res.status(200).json({ matchFound, guruMatch });
    //   } else
        res.status(200).json({ gurus, websites });
        // res.status(200).json({ websiteMatch, guruMatch });
    });
}

// FIXME: get this to work
// function checkMatch(input, source){
//     let match = null;
//     source.forEach((keyword) => {
//       if (input.includes(keyword.toLowerCase())) {
//         match = keyword;
//         break;
//       }
//     });
//     // if(match !== ""){
//     //     return match;
//     // }
//     // else return "";
//     return match;
// }