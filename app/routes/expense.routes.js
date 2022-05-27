const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
const mongoose = require("mongoose");

// Create addExpense
router.post("/addExpense", (req, res, next) => {
  console.log("Adding New Expense");
  const expenseObj = {
    _id: new mongoose.Types.ObjectId(),
    category: req.body.category,
    amount: req.body.amount,
    receipt: req.body.receipt,
    paymentMethod: req.body.paymentMethod,
    date: req.body.date,
    comment: req.body.comment,
    username: req.body.username, // same username that is being pulled from useNavigate prop 
  };

  console.log(expenseObj); 

  const newExpense = new Expense(expenseObj);
  newExpense.save((err) => {
    if (err) {
      console.log("line 22 expense route", err)
      res.status(400).send("There is an error while adding a new expense");
    } else {
      res.status(200).json(newExpense);
    }
  });
});

router.get("/userExpenses/:id", async (req, res) => {
  const {id}= req.params //we need to pass the user value here 

  const expense= await Expense.find({
    username:id
  });
  console.log(expense)
  res.status(200).json(expense)
  
  // ({ _id: req.body.username }) //can we replace this with an empty string to update the id ? -RO
  //   .populate("username")
  //   // .exec(function (err) {
  //   //   if (err){
  //   //     return handleError(err);};
  //   // });
    // res.json(expense);

});

// Retrieve a single expense with id
router.get("/:id", async function (req, res, next) {
  const expense = await Expense.findById({
    _id: req.params.id,
  });
  res.json(expense);
});

// Update a expense with id
router.patch("/:id", async function (req, res, next) {
  const { category, amount, paymentMethod, date, comment } = req.body;
  const updateExpense = await Expense.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  res.json(updateExpense);
});

// Delete a expense with id
router.delete("/:id", async function (req, res, next) {
  const deleteExpense = await Expense.findByIdAndDelete(req.params.id);
  res.send("Entity was deleted successfully");
  res.json(deleteExpense);
});

module.exports = router;
