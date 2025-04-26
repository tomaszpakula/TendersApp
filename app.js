const express = require("express");
const sequelize = require("./db/db");

const path = require("path");
const router = require("./routes/index");
const expressLayouts = require("express-ejs-layouts");


const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "main");
app.set("views", path.join(__dirname, "views"));
app.use("/", router);
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
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
