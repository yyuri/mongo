// npm packages
const express = require("express");
const bodyParser = require('body-parser')
const dotenv = require("dotenv");
const helmet = require('helmet')
const cors = require('cors')
const passport = require('passport')
const routes = require('./routes')

// app imports
const { connectToDatabase } = require("./config/mongo");

dotenv.config();
const app = express();



// for parsing json
app.use(
  bodyParser.json({
    limit: '20mb'
  })
)
// for parsing application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    limit: '20mb',
    extended: true
  })
)



// Headers and security setup, we use cors and helmet packages
app.use(cors())
app.use(passport.initialize())
app.use(helmet())
app.use('/static', express.static('./app/static'));
app.use(routes)

// database
connectToDatabase();
module.exports = app;
