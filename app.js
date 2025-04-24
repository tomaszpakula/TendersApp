const express = require("express");
const sequelize = require("./db/db");
const Tender = require("./models/Tender");
const path = require("path");
const router = require("./routes/index");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/", router);
app.use(express.urlencoded({ extended: true }));
sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(3000, () => {
      console.log("Server works on port 3000");
    });
  })
  .catch((err) => {
    console.error("Error: ", err);
    process.exit(1);
  });

module.exports = app;
