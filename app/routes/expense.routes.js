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

// Delete a expense with id
router.delete("/deleteExpense/:id", async (req, res, next) => {
  const {id} = req.params
      console.log(id)
      // console.log('line 46', id)
  const deleteById = await Expense.findByIdAndDelete(
    {
  _id : id
  });
  // console.log("line 59 deletebyId", deleteById)
  // res.send("Entity was deleted successfully");
  res.json(deleteById);
  
})

// Update a expense with id
// router.patch("/:id", async function (req, res, next) {
//   const { category, amount, paymentMethod, date, comment } = req.body;
//   const updateExpense = await Expense.findByIdAndUpdate(
//     req.params.id,
//     req.body
//   );
//   res.json(updateExpense);
// });


module.exports = router;
