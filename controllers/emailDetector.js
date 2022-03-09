/*******************************************
 * These controller functions are for:
 *    Detecting if an email is a scam or not
 *******************************************/
const Email_Keywords = require("../models/emailKeywords");

// TODO: make the naming conventions make more sense and have more consistency

// TODO: do error handling!!!
// TODO: add a 500 error for if it doesn't connect to the database!!! 
// TODO: do i need to use async await?
// FIXME: FIX WORD WRAP ISSUE?
exports.checkEmail = (req, res, next) => {
  
  // note the field should be called input!!!
 // need to make the input lowercase so it will match the keywords!
  let userInput = (req.body.input).toLowerCase();
  console.log(userInput);

  let keywordsList = [];
  Email_Keywords.find()
    .then((databaseList) => {
      databaseList.forEach((keyword) => {
        keywordsList.push(keyword.keyword);
      });
      let matches = checkKeywords(userInput, keywordsList);
      let rating = rateScam(matches);
      // TODO: maybe don't send the matches, send a code so the server knows if it is a scam or not, or if it is close, or if it is definetly a scam
      console.log(matches, rating );
      res.status(200).json({ matches, rating });
    })
    .catch((err) => {
      console.log(err);
    });

  // console.log(matches);
  // let keywords = checkKeywords(userInput);
  // let result = rateScam(keywords);

  // res.send(`Does it have dad?  ${checkText(text)}`);
  // TODO: return JSON and return a result and the number of keywords or maybe just the level of scam or maybe the text to display?
};

// TODO: do something so that duplicates are removed from the keywords, before they are processed
// FIXME: this is not getting all the keywords!!! 
function checkKeywords(input, keywords) {
  // get the keywords from database and use a for each loop to go through them all to see if they are in the input
  let matches = 0;
  keywords.forEach((keyword) => {
    if (input.includes(keyword.toLowerCase())) {
      matches++;
    }
  });
  return matches;
}

function rateScam(numMatches) {
  // get the number of keywords and return the liklihood of it being a scam (in json)
  if (numMatches < 4) {
    // less than 4 means no scam detected
    return 0;
  } else if (numMatches === 4) {
    // 4 means possible scam
    return 1;
  } else if (numMatches < 10) {
    // 5-10 means scam detected
    return 2;
  } else if (numMatches >= 10) {
    // more than 10 means definetly a scam
    return 3;
  }
}

// WORD WRAP ISSUE: IT WONT COUNT US DOLLARS IN THIS ONE
// Hello,

// My name is Felix, I'm contacting you with an urgent and highly
// confidential matter relating to funds in excess of Seven Million US
// Dollars resulting from a liquidated Bitcoin account belonging to a
// deceased account holder.

// I will let you know my plans and why I chose to contact you in the
// first place after I have received your reply and gained your trust.

// Many thanks and looking forward to your response.

// Best regards.
// Felix

// good control email for testing: (should not appear to be a scam):
// Hi there! I'm Matt, the CEO of Bonsai. I'm excited to tell you that Bonsai Cash -- our business account built just for freelancers and small businesses -- is now in private beta. Once you're set up, we'll pay $50 into the account so you can see how it works.

// What is Bonsai Cash? It's a business account designed to save you time and give you greater control and visibility over your finances. It includes a checking account, debit card, and deep integrations with Bonsai's payments, tax, and reporting features. There are no monthly or hidden fees.

// Interested? Here's what's available to use today:
// - An online checking account
// - A virtual debit card
// - "Envelopes", or virtual savings accounts, you can create and transfer money into
// - "Envelope automations" so you can automatically move money from payments into your envelopes

// If you're interested, I'd love to schedule a 15 minute onboarding session this week. I'll personally get you set up and answer any questions you have. Just reply to this email and we'll go from there!

// it didnt catch this one, may be too short

// attention Dear customer!!
// I have registered your ATM CARD of $4.8with UPS Express
// Courier Company with registration code of ( DCJKT00678G).
// please Contact with your delivery information such as, Your Name,
// Your Address ID CARD COPY and Your Telephone Number
// DHL Office:
// Name of Dir: Mr.Thomas Edward
// Email: (edwardsimsthomas@gmail.com)
// Telphone +2347030300161 or whatsapp +2347030300161
// I have paid for their Security fee & Delivery fee.The only
// fee you have to pay is the Insurance of $50 dollar only.
// Please indicate the registration Number and ask Him how much is
// their Insurance fee so that you can pay it.
// Best Regards,
// Mr,Mark White.
