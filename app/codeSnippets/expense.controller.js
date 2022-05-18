const db = require("../models");
const Expense = db.expense;
// Create and Save a new Tutorial

  exports.create = (req, res) => {
  //  Validate request
   if (!req.body.title) {
     res.status(400).send({ message: "Content can not be empty!" });
     return;
   }
  //  Create a Tutorial
    const user = new User({
      username: "JohnDoe",
      email: "JohnDoe@gmail.com",
      password: "imapass1234"
    });

   const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });
  //  Save Tutorial in the database
   user
     .save(user)
     .then(data => {
       res.send(data);
     })
//     //  .catch(err => {
//     //    res.status(500).send({
//     //      message:
//     //        err.message || "Some error occurred while creating the Tutorial."
//     //    });
//     //  });
//  };
 
//  // Find All Tutorials
//  exports.findAll = (req, res) => {
//    const title = req.query.title;
//    let condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
//    Tutorial.find(condition)
//      .then(data => {
//        res.send(data);
//      })
//      .catch(err => {
//        res.status(500).send({
//          message:
//            err.message || "Some error occurred while retrieving tutorials."
//        });
//      });
//  };
 
//  // Find one tutorial
//  exports.findOne = (req, res) => {
//    const id = req.params.id;
//    Tutorial.findById(id)
//      .then(data => {
//        if (!data)
//          res.status(404).send({ message: "Not found Tutorial with id " + id });
//        else res.send(data);
//      })
//      .catch(err => {
//        res
//          .status(500)
//          .send({ message: "Error retrieving Tutorial with id=" + id });
//      });
//  };
 
//  // Update tutorial by id
//  exports.update = (req, res) => {
//    if (!req.body) {
//      return res.status(400).send({
//        message: "Data to update can not be empty!"
//      });
//    }
//    const id = req.params.id;
//    console.log(id);
//    Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//      .then(data => {
//        if (!data) {
//          res.status(404).send({
//            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
//          });
//        } else res.send({ message: "Tutorial was updated successfully." });
//      })
//      .catch(err => {
//        res.status(500).send({
//          message: "Error updating Tutorial with id=" + id
//        });
//      });
//  };
 
//  // Find by Id and Remove
//  exports.delete = (req, res) => {
//    const id = req.params.id;
//    Tutorial.findByIdAndRemove(id)
//      .then(data => {
//        if (!data) {
//          res.status(404).send({
//            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
//          });
//        } else {
//          res.send({
//            message: "Tutorial was deleted successfully!"
//          });
//        }
//      })
//      .catch(err => {
//        res.status(500).send({
//          message: "Could not delete Tutorial with id=" + id
//        });
//      });
//  };
 
// // Delete
//  exports.deleteAll = (req, res) => {
//    Tutorial.deleteMany({})
//      .then(data => {
//        res.send({
//          message: `${data.deletedCount} Tutorials were deleted successfully!`
//        });
//      })
//      .catch(err => {
//        res.status(500).send({
//          message:
//            err.message || "Some error occurred while removing all tutorials."
//        });
//      });
//  };
// // find all objects by condition
//  exports.findAllPublished = (req, res) => {
//    Tutorial.find({ published: true })
//      .then(data => {
//        res.send(data);
//      })
//      .catch(err => {
//        res.status(500).send({
//          message:
//            err.message || "Some error occurred while retrieving tutorials."
//        });
//      });
 };
