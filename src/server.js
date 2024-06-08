const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const bodyParser = require("body-parser");
const configViewEngine = require("./config/viewEngine");
const mongoose = require("mongoose");
const app = express();
const port = 8081;
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

const dbUrl = "mongodb://localhost:27017/testabc";
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.error("mongodb connection error:", err);
  });

const userSchema = new mongoose.Schema({
  // Các trường khác của user
  email: String,
  username: String,
});

const User = mongoose.model("User", userSchema);

app.post("/createUser", async (req, res) => {
  try {
    const newUser = new User({
      email: req.body.email,
      username: req.body.phone,
    });
    console.log("Check User", req.body);
    // Lưu user mới vào cơ sở dữ liệu
    await newUser.save();

    // Phản hồi với mã trạng thái 200 để cho biết tạo user thành công
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    // Phản hồi với mã trạng thái 500 để cho biết có lỗi xảy ra
    res.sendStatus(500);
  }
});

app.get("/", async (req, res) => {
  try {
    // Lấy tất cả các người dùng từ cơ sở dữ liệu
    const users = await User.find();
    console.log(users);
    return res.render("home.ejs", { users: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${hostname}:${port}`);
});
