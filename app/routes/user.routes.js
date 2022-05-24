const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isValidToken = require("../../middleware/isValidToken");
const saltRounds = bcrypt.genSaltSync(Number(process.env.SALT_FACTOR));
require("dotenv").config();
const mongoose = require("mongoose");

//Register a new user route
router.post("/register", async (req, res, next) => {
  const { username, password, email } = req.body;
  const hashPassword = bcrypt.hashSync(password, saltRounds);
  console.log("line 20: ", password, hashPassword);
  const createUser = await User.create({
    username,
    password: hashPassword,
    email,
  });
  // const user = await User.findById(createUser._id)
  res.json(createUser);
});

//Login route
router.get("/users", async (req, res, next) => {
  // const { username, password } = req.body;
  const user = await User.findAll({
    username: username,
  });
  console.log(username);
  console.log(user);
})
//Login route
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    username: username,
  });
  console.log(username);
  console.log(user);
  const comparePass = bcrypt.compareSync(password, user.password);
  if (comparePass) {
    const token = jwt.sign(
      {
        data: user.username,
        _id: user._id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.cookie("token", token);
    //   res.json('line 48', token)
    res.json("Access granted");
    //   res.redirect(`/profile/${user.id}`);
  } else {
    res.send("wrong password!");
  }
});


router.get('/logout', function(req, res) {
  res.clearCookie('jwt').send();
  // res.json('/');

});

module.exports = router;
