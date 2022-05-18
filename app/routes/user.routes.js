const express = require("express");
const router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const isValidToken = require("../../middleware/isValidToken");
const saltRounds = bcrypt.genSaltSync(Number(process.env.SALT_FACTOR));
require("dotenv").config();
let globalUsername;


router.post('/register', async (req, res, next) => {
    const { username, password, email } = req.body
    const hashPassword = bcrypt.hashSync(password, saltRounds)
    console.log('line 20: ', password, hashPassword)
    const createUser = await User.create({
        username,
        password: hashPassword,
        email
    })
    // const user = await User.findById(createUser._id)
    res.json(createUser)
})

// get will only take from teh params-- post routes will take from the inputs
// insert middleware after async, <middleware>
router.post('/login', async (req, res, next) => {
    const { username, password } = req.body
    globalUsername = username;
    const user = await User.findOne({
        where: {
          username: username,
        },
      });
    // res.json('this is a user')
    if (user) {
        const comparePass = bcrypt.compareSync(password, user.password);
        if (comparePass === true) {
          const token = jwt.sign(
            {
              data: user.username,
            },
            process.env.SECRET_KEY,
            {
              expiresIn: "1h",
            }
          );
          res.cookie("token", token);
        //   res.json('line 48', token)
          res.json("Access Garanteed")
        //   res.redirect(`/profile/${user.id}`);
        } else {
          res.send("wrong password!");
        }
      } else {
        res.send("sorry, no user found");
      }
})


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


