const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

app.use(express.json());

const SECRET = "mujhecodingnhiati:)";

mongoose.connect(
  "mongodb://127.0.0.1:27017/?directClectionTimeoutMS=2000&appName=mongosh+2.1.1",
  { dbName: "ecommerce" }
);

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("users", userSchema);

app.get("/api", (req, res) => {
  res.send("hwllo world");
});

app.post("/users/signup", (req, res) => {
  const { username, password } = req.body;
  function callback(user) {
    if (user) {
      res.status(400).json("User Already exist");
    } else {
      let adminUser = new User({ username, password });
      adminUser.save();
      const token = jwt.sign({ username, role: "user" }, SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({ message: "Signed up successfully", token });
    }
  }

  User.findOne({ username }).then(callback);
});

app.post("/users/signin", async (req, res) => {
  const { username, password } = req.headers;
  const userExist = await User.findOne({ username, password }).exec();
  if (userExist) {
    const token = jwt.sign({ username, role: "user" }, SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Logged in successfull", token });
  } else {
    res.status(403).json("Invalid password or email");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
