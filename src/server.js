const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const bodyParser = require("body-parser");
const configViewEngine = require("./config/viewEngine");

const app = express();
const port = 8080;
const hostname = "localhost";
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
configViewEngine(app); //configViewEngine
//config json api
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//config static
app.use("/public", express.static(path.join(__dirname, "public")));

//used router
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/home", (req, res) => {
  res.render("home.ejs");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${hostname}:${port}`);
});
