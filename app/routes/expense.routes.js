const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const mongoose = require("mongoose");


// Create addExpense 
  router.post('/addExpense', (req, res, next) => {
    console.log("Adding New Expense");
    const expenseObj = {
      "_id": new mongoose.Types.ObjectId(),
      "category": req.body.category,
      "amount": req.body.amount,
      "receipt": req.body.receipt,
      "paymentMethod": req.body.paymentMethod,
      "date": req.body.date,
      "comment": req.body.comment,
      "username": req.body.username
    }
    const newExpense = new Expense(expenseObj);
     newExpense.save((err) => {
      if(err) {
        res.status(400).send("There is an error while adding a new expense")
     }
      else { 
        res.status(200).json(newExpense)
      }
    })
  })

// Get userExpenses by user ID
    // change username to activeUser
    // refactor line 41
  router.get('/userExpenses', (req, res) => {
    Expense.
      findOne({ _id: "6286e382e64990aea2212571" }).
      populate('username').
      exec(function (err, expense) {
        if (err) return handleError(err);
        console.log('The Expense is %s', expense);
        res.json(expense)
  });
  })

  // Retrieve a single expense with id
  router.get('/:id', async function(req, res, next) {
    const expense = await Expense.findById ({
        _id: req.params.id });
    res.json(expense);
  });
  
  // Update a expense with id
  router.patch('/:id', async function(req, res, next) {
    const {category, amount, paymentMethod, date, comment} = req.body
    const updateExpense = await Expense.findByIdAndUpdate (
    req.params.id, req.body );
    res.json(updateExpense);
  });

  // Delete a expense with id
  router.delete('/:id', async function(req, res, next) {
    const deleteExpense = await Expense.findByIdAndDelete (
    req.params.id);
    res.send('Entity was deleted successfully')
    res.json(deleteExpense);
  });
  


module.exports = router