const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const bodyParser = require("body-parser");
const configViewEngine = require("./config/viewEngine");

const app = express();
const port = 8081;
const hostname = "localhost";
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
configViewEngine(app); //configViewEngine

const server = require("http").createServer(app);
const io = require("socket.io")(server);

//config json api
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//config static
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  return res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("connection");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${hostname}:${port}`);
});
