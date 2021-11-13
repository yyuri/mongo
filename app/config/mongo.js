const mongoose = require("mongoose");

const APP_NAME = process.env.APP_NAME;
const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

// database configs

let MONGODB_URI = process.env.MONGODB_URI;
if (ENV === "test") {
  MONGODB_URI = global.__MONGO_URI__;
}

if (ENV === "development" || ENV === "test") {
  mongoose.set("debug", true);
}

/**
 * Connect to mongoose asynchronously or bail out if it fails
 */
async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, {
      autoIndex: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log('****************************')
    console.log('*Server STARTED')
    console.log(`*Port: ${process.env.PORT || 5000}`)
    console.log(`*NODE_ENV: ${process.env.NODE_ENV}`)
    console.log(`${APP_NAME} successfully connected to database.`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = {
  APP_NAME,
  ENV,
  MONGODB_URI,
  PORT,
  connectToDatabase
};
