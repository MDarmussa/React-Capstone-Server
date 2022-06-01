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
    username: req.body.username, 
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

// GEt Expenses
router.get("/userExpenses/:id", async (req, res) => {
  const {id}= req.params 
  try{
    const expense= await Expense.find({
      username:id
    });
    console.log('line 40, expenses', expense)
    res.status(200).json(expense);
  }
  catch (error) {
    console.log(error)
    res.json(error)
  }
});

// Delete a expense By id
router.delete("/deleteExpense/:id", async (req, res, next) => {
  const {id} = req.params
  const deleteById = await Expense.findByIdAndDelete(
    {
  _id : id
  });
  res.json(deleteById);
})

module.exports = router;
