/*******************************************
 * These controller functions are for:
 *    Detecting if an entered company is an mlm
 *    and what kind of company it is
 *******************************************/

const Mlm_List = require("../models/mlmList");
let matchFound = false;
let match = null;
let type = null;

exports.checkCompany = (req, res, next) => {
    let userInput = (req.body.input).toLowerCase();
    // console.log(userInput);
    let companys = [];
    Mlm_List.find()
    .then((databaseList) => {
      databaseList.forEach((company) => {
        companys.push(company);
      });
      checkMatch(userInput, companys);
      res.status(200).json({matchFound, match, type});
    })
    .catch((err) => {
      console.log(err);
    });
};

function checkMatch(input, mlmList){
    let currMlm = '';
    mlmList.forEach((mlm) => {
      currMlm = mlm.company;
      // remove parenthesis to check the match, if there exists parenthesis
      if (currMlm.includes('(')){
        currMlm = currMlm.substring(0,currMlm.indexOf('('));
      }
      // need to check if null, can't do toLowerCase on null
      if (input.includes(currMlm.toLowerCase())) {
        match = mlm.company;
        matchFound = true;
        type = mlm.type;
        return;
      }
    });
    return;
}