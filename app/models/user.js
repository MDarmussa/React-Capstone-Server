const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
  // _id: Schema.Types.ObjectId,
  username: {
    type:String,
    required:true,
    unique:true,
    validate: {
      validator: function(text) {
        return text.length > 0;
      },
      message: "Empty name is not allowed"
    }
  },


  email:{
    type:String,
    required:true,
  },

  password:{
    type:String,
    required:true,
  },

},
  {timestamps:true}
);

const User = mongoose.model('User', userSchema);

module.exports = User;



// const bcrypt = require('bcrypt');
// const mongoose = require('mongoose');
// const saltFactor = 10;

// const userSchema = mongoose.Schema(
//   {
//     username: String,
//     email: String,
//     password: String,
//   },
//   { timestamps: true }
// );
// // place bcrypt script here 
// const User = mongoose.model('user', userSchema);
// module.exports = User;