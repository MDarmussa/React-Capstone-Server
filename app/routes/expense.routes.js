const express = require('express');
const router = express.Router();
const Expense = require('../models/expense');
  
  router.post("/create", async (req, res, next) => {
    const { type, amount, payment, date, comment } = req.body
    const createExpense = await Expense.create(req.body)
    res.json(createExpense)
  });
  // // Retrieve all expense
  // router.get("/:id", expense.findAll);
  // // Retrieve a single expense with id
  // router.get("/:id", expense.findOne);
  // // Update a expense with id
  // router.put("/:id", expense.update);
  // // Delete a expense with id
  // router.delete("/:id", expense.delete);
  // // Create a new expense
  // router.delete("/", expense.deleteAll);
  // app.use("/api/expense", router);


module.exports = router
