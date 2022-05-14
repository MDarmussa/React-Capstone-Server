const db = require("../models");
const User = db.user;
// Create and Save a new Tutorial
exports.create = (req, res) => {
   if (!req.body.username) {
       res.status(400).send({ message: "Content can not be empty!" });
       return;
     }
     // Create a Tutorial
     const user = new User({
       firstName: req.body.firstName,
       lastName: req.body.lastName,
       username: req.body.username,
       email: req.body.email,
       password: req.body.password,
       address: req.body.address,
     });
     // Save Tutorial in the database
     user
       .save(user)
       .then(data => {
         res.send(data);
       })
       .catch(err => {
         res.status(500).send({
           message:
             err.message || "Some error occurred while creating the Tutorial."
         });
       });
};
// Retrieve all Tutorials from the database.
       // exports.findAll = (req, res) => {
       //     const user = req.query.title;
       //     var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
       //     Tutorial.find(condition)
       //     .then(data => {
       //         res.send(data);
       //     })
       //     .catch(err => {
       //         res.status(500).send({
       //         message:
       //             err.message || "Some error occurred while retrieving tutorials."
       //         });
       //     });
       // };
// Find a single Tutorial with an id
exports.findOne = (req, res) => {
   const _id = req.params._id;
 User.findById(_id)
   .then(data => {
     if (!data)
       res.status(404).send({ message: "Not found Tutorial with id " + _id });
     else res.send(data);
   })
   .catch(err => {
     res
       .status(500)
       .send({ message: "Error retrieving Tutorial with id=" + _id });
   });
};
// Update a Tutorial by the id in the request
