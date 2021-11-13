const { APP_NAME, PORT } = require("./config/mongo");
const app = require("./app");

app.listen(PORT, () => {
  console.log(`${APP_NAME} is listening on port ${PORT}...`);
});
