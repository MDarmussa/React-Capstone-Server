const express = require("express");
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const isValidToken = require("../../middleware/isValidToken");
const saltRounds = bcrypt.genSaltSync(Number(process.env.SALT_FACTOR));
require("dotenv").config();
const mongoose = require("mongoose");

      // router.post('/register', async (req, res, next) => {
      //     const { username, password, email } = req.body
      //     const hashPassword = bcrypt.hashSync(password, saltRounds)
      //     console.log('line 20: ', password, hashPassword)
      //     const createUser = await User.create({
      //         username,
      //         password: hashPassword,
      //         email
      //     })
      //     // const user = await User.findById(createUser._id)
      //     res.json(createUser)
      // })

router.post('/register', async (req, res, next) => {
  console.log("Adding new user");
  const userObj = {
    "_id": new mongoose.Types.ObjectId(),
    "username": req.body.username,
    "password": req.body.password,
    "email": req.body.email,
  }
  const newUser = new User(userObj);
  newUser.save((err, user) => {
    if(err)
      res.status(400).send("There is an error while adding a new user")
    else
      res.send(200).json(user)
  })
})

//Not sure what this is below
  router.get('/users', (req, res) => {
    console.log('Getting all Users');
    User.find({}).populate('User').exec((err, users) => {
      if(err)
        res.status(400).send(err)
      else
        res.status(200).json(users)
    })
  })


router.post('/login', async (req, res, next) => {
    const { username, password } = req.body
    const user = await User.findOne({
          username: username,
      });
      console.log(username)
      console.log(user)
      const comparePass = bcrypt.compareSync(password, user.password)
    if (comparePass) {
          const token = jwt.sign(
            {
              data: user.username,
              _id: user._id
            },
            process.env.SECRET_KEY,
            {
              expiresIn: "1h",
            }
          );
          res.cookie("token", token);
        //   res.json('line 48', token)
          res.json("Access Garanteed");
        //   res.redirect(`/profile/${user.id}`);
        } else {
          res.send("wrong password!");
        }
    } 
    // else {
      //   res.send("sorry, no user found");
      // }
)

// router.post("/update", async (req, res) => {
//     const {username, password, email} = req.body
//     const id = Number(req.body._id) 
//     const hashedPassword = bcrypt.hashSync(password, saltRounds);
//     console.log(req.body, "user line 137")
//     const updateUser = await User.updateOne(
//       {
//         username: username, 
//         password: hashedPassword,
//         email: email,
//       },
//       {
//         where: {
//           id: _id
//         },
//       }
//     );
//       res.json(updateUser)
//   });

module.exports = router


