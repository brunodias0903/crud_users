const app = require("./app");
const sequelize = require("./config/database");

const port = 3000;

sequelize.sync().then(() => {
  console.log("Database synchronized");
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
