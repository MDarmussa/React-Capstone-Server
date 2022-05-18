const express = require("express");
const router = express.Router();
const User = require('../models/user')

// get will only take from teh params-- post routes will take from the inputs
// insert middleware after async, <middleware>
router.post('/login',  (req, res, next)=>{
    const { username, password } = req.body
    res.json('this is a user')
})

router.post('/register', async (req, res, next) => {
    const { username, password, email } = req.body
    const createUser = await User.create(req.body)
    const user = await User.findById(createUser._id)
    res.json(user)
})

module.exports = router


