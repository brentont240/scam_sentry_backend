/*******************************************
 * These controller functions are for:
 *    Detecting if an entered person is a fake guru
 *    or if a website is part of a get rich quick scheme
 *******************************************/
 const Fake_Gurus = require("../models/fakeGurus");

exports.checkGuru = (req, res, next) => {
    let userInput = (req.body.input).toLowerCase();
    console.log(userInput);
    let result = "";
    Fake_Gurus.find()
    .then((databaseList) => {
      databaseList.forEach((guru) => {
        result += (guru.guru_name);
      });
    });

    res.send(result);


}