const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

const SECRET = "mujhecodingnhiati:)";

mongoose.connect(
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1",
  { dbName: "Courses" }
);

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("users", userSchema);

app.get("/api", (req, res) => {
  res.send("Hello world");
});

app.post("/users/signup", (req, res) => {
  const { username, password } = req.body;
  if (username === "" || password === "") {
    return res.status(400).send("Fields cannot be empty!");
  }
  console.log("Received signup request:", req.body);

  function callback(user) {
    if (user) {
      res.status(400).json("User Already exists");
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
  const { username, password } = req.body;
  if (username === "" || password === "") {
    return res.status(400).send("Field cannot be empty!");
  }
  try {
    const userExist = await User.findOne({ username, password }).exec();
    if (userExist) {
      const token = jwt.sign({ username, role: "user" }, SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({ message: "Logged in successfully", token });
    } else {
      res.status(403).json("Invalid password or email");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
