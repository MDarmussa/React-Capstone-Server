const express = require("express");
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const isValidToken = require("../../middleware/isValidToken");
const saltRounds = bcrypt.genSaltSync(Number(process.env.SALT_FACTOR));
require("dotenv").config();
const Expense = require('../models/Expense');

let globalUsername;
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


//Trial AddUser

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

  //trial adding expense based on the user
  router.post('/addExpense', (req, res, next) => {
    console.log("Adding New Expense");
    const expenseObj = {
      "_id": new mongoose.Types.ObjectId(),
      "category": req.body.category,
      "amount": req.body.amount,
      "paymentMethod": req.body.paymentMethod,
      "date": req.body.date,
      "comment": req.body.comment,
      "username": req.body.username
    }
    console.log("59", expenseObj)
    const newExpense = new Expense(expenseObj);
    console.log("61", newExpense)
     newExpense.save((err) => {
      if(err) {
        res.status(400).send("There is an error while adding a new expense")
        console.log(err)
     }
      else { 
        res.status(200).json(newExpense)
      }

    })
    console.log("70", newExpense)
  })


  router.get('/expensebyID', (req, res) => {
    Expense.
      findOne({ _id: "6286e382e64990aea2212571" }).
      populate('username').
      exec(function (err, expense) {
        if (err) return handleError(err);
        console.log('The Expense is %s', expense);

        res.json(expense)
    // prints "The author is Ian Fleming"
  });
  })


  //getting data
  router.get('/users', (req, res) => {
    console.log('Gelling all Users');
    User.find({}).populate('User').exec((err, users) => {
      if(err)
        res.status(400).send(err)
      else
        res.status(200).json(users)
    })
  })



// get will only take from teh params-- post routes will take from the inputs
// insert middleware after async, <middleware>
router.post('/login', async (req, res, next) => {
    const { username, password } = req.body
    // globalUsername = username;
    // console.log(globalUsername)
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


