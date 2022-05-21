//Register
// router.post('/register', async (req, res, next) => {
//   console.log("Adding new user");
//   const hashPassword = bcrypt.hashSync(password, saltRounds)
//   const userObj = {
//     "_id": new mongoose.Types.ObjectId(),
//     "username": req.body.username,
//     "password": req.body.password,
//     "email": req.body.email,
//   }
//   const newUser = new User(userObj);
//   newUser.save((err, user) => {
//     if(err)
//       res.status(400).send("There is an error while adding a new user")
//     else
//       res.send(200).json(user)
//   })
// })



//Update USER Info
// router.post("/update", async (req, res) => {
//      const {username, password, email} = req.body
//      const id = Number(req.body._id) 
//      const hashedPassword = bcrypt.hashSync(password, saltRounds);
//      console.log(req.body, "user line 137")
//      const updateUser = await User.updateOne(
//        {
//          username: username, 
//          password: hashedPassword,
//          email: email,
//        },
//        {
//          where: {
//            id: _id
//          },
//        }
//      );
//        res.json(updateUser)
//    });




//Not sure what this is below
// router.get('/users', (req, res) => {
//      console.log('Getting all Users');
//      User.find({}).populate('User').exec((err, users) => {
//        if(err)
//          res.status(400).send(err)
//        else
//          res.status(200).json(users)
//      })
//    })
 
 