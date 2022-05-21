const mongoose = require('mongoose');
const Schema = mongoose.Schema;

  const expenseSchema = Schema({
    _id: Schema.Types.ObjectId,
    
    category: {
      type: String,
      enum: ['Utilities', 'Housing', 'Transportation', 'Medical', 'Pet', 'Credit Cards', 'Entertainment', 'Personal Care', 'Grocery', 'Dining', 'Subscription Services', 'Investments', 'Savings', 'Childcare', 'Student Loans', 'Clothing', 'Insurance', 'Other'],   
    },

    amount: Number,
    
    receipt: {
      data: Buffer,
      contentType: String
    },

    paymentMethod:{
      type: String,
      enum: ['Debit Card', 'Credit Card', 'Cash', 'Bitcoin', 'Other'],
    },

    date: Date,

    comment: String,

    username: {
      require: true,
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
    { timestamps: true }
)

  const Expense = mongoose.model('Expense', expenseSchema)
  module.exports = Expense
