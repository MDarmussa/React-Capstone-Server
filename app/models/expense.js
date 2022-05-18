const mongoose = require('mongoose');

    const expenseSchema = mongoose.Schema(
      {
        category: {
          type: String,
          enum: ['Utilities', 'Housing', 'Transportation', 'Medical', 'Pet', 'Credit Cards', 'Entertainment', 'Personal Care', 'Grocery', 'Dining', 'Subscription Services', 'Investments', 'Savings', 'Childcare', 'Student Loans', 'Clothing', 'Insurance', 'Other'],   
        },
        amount: Number,
        receipt: {
           data: Buffer,
           contentType: String},
        paymentMethod: String,
        date: Date,
        comment: String,
      },
      { timestamps: true }
    )
    const Expense = mongoose.model('expense', expenseSchema)

module.exports = Expense
