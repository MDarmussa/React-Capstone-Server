const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const saltFactor = 10;

const userSchema = mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);
// place bcrypt script here 
const User = mongoose.model('user', userSchema);
module.exports = User;