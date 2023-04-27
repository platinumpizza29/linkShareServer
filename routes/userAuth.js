const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  //check if the email does not exists
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).send("Email doesn't exists");
  }
  //if password is correct
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) {
    return res.status(400).send("Invalid Password");
  }
  //create a token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.header("auth-token", token).status(200).send(token);
});

//register user
router.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const fullName = req.body.fullName;

  //check if the user exists
  const emailExists = await User.findOne({ email: email });
  if (emailExists) {
    return res.status(400).send("email already exists");
  }

  //hashed password
  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);

  //create a new user
  const user = new User({
    username: username,
    password: hashedPassword,
    email: email,
    fullName: fullName,
  });
  try {
    const savedUser = user.save();
    res.send(user).status(201);
  } catch (error) {
    res.send(error).status(400);
  }
});

module.exports = router;
