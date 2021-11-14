// npm packages
const dotenv = require("dotenv");
const express = require("express");
const helmet = require('helmet')
const cors = require('cors')
const passport = require('passport')

// Swagger API documentation
const swaggerDocument = require('./static/swagger.json');
const swaggerUi = require('swagger-ui-express');

// app imports
const { connectToDatabase } = require("./config/mongo");
const { errorHandler } = require("./handlers");
const router = require("./routers");

// global constants
dotenv.config();
const app = express();
const {
  bodyParserHandler,
  globalErrorHandler,
  fourOhFourHandler,
  fourOhFiveHandler
} = errorHandler;

// database
connectToDatabase();

// body parser setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ type: "*/*" }));
app.use(bodyParserHandler); // error handling specific to body parser only

// Headers and security setup, we use cors and helmet packages
app.use(cors())
app.use(helmet())

// Passport
app.use(passport.initialize())

// Load and use all routes
app.use("/", router)

const uiDocsOptions = {
  customCssUrl: '/static/style.css'
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, uiDocsOptions));
app.use('/static', express.static('./app/static'));
// catch-all for 404 "Not Found" errors
app.get("*", fourOhFourHandler);
// catch-all for 405 "Method Not Allowed" errors
app.all("*", fourOhFiveHandler);
app.use(globalErrorHandler);


/**
 * This file does NOT run the app. It merely builds and configures it then exports it.config
 */
module.exports = app;
