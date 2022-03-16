/*******************************************
 * These controller functions are for:
 *    Detecting if an entered company is an mlm
 *    and what kind of company it is
 *******************************************/

const Mlm_List = require("../models/mlmList");

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