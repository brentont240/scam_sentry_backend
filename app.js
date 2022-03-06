import express from 'express';
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require('cors');

// Database Setup
// Connect to MongoDB
// TODO: PUT THE USERNAME AND PASSWORD IN ENVIRONEMENT VARIABLES: LOOK AT SUPER BRACKETS FOR MORE INFO!!!
const username = process.env.SCAM_SENTRY_USERNAME;
const password = process.env.SCAM_SENTRY_PASSWORD;

// TODO: REMOVE PASS BEFORE PUBLISHING!!! (between the : and @)

const MONGODB_URL = process.env.MONGODB_URL || `mongodb+srv://${username}:${password}@scamsentrycluster.urdcn.mongodb.net/Tools`;
const MONGODB_URI = MONGODB_URL;

const corsOptions = {
   origin: "https://scam-sentry-backend.herokuapp.com/",
   optionsSuccessStatus: 200
 };

const app = express();


// TODO: host the backend on heroku and the front end on something else!!!

// TODO: SHOULD I PUT /api/ in front of the routes?

const emailDetectorRoutes = require('./routes/emailDetector');

const PORT = process.env.PORT || 8000;

app.use(express.json()); // Needed to read the body. (instead of body parser, body parser is depricated)
app.use(emailDetectorRoutes);
app.use(cors(corsOptions));


mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
     })
     .catch((err) => {
        console.log(err);
     });

app.listen(PORT, () => console.log('Server connected at port:', PORT));