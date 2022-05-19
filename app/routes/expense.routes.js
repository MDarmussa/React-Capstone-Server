const express = require('express');
const router = express.Router();
const Expense = require('../models/expense');

// Create a new expense
  router.post("/create", async (req, res, next) => {
    const { type, amount, payment, date, comment } = req.body
    const createExpense = await Expense.create(req.body)
    res.json(createExpense)
  });

  // // Retrieve all expense
  // router.get("/:id", expense.findAll);
 
  // Retrieve a single expense with id
  router.get('/:id', async function(req, res, next) {
    const expense = await Expense.findById ({
        _id: req.params.id });
    res.json(expense);
  });
  
  // Update a expense with id
  router.patch('/:id', async function(req, res, next) {
    const {amount, type, payment, date, comment} = req.body
    const updateExpense = await Expense.findByIdAndUpdate (
    req.params.id, req.body );
    res.json(updateExpense);
  });

  // Delete a expense with id
  router.delete('/:id', async function(req, res, next) {
    const deleteExpense = await Expense.findByIdAndDelete (
    req.params.id);
    res.json(deleteExpense);
  });
  


module.exports = router