module.exports = mongoose => {
    const Expense = mongoose.model(
      "expense",
      mongoose.Schema(
        {
          category: {
            type: String,
            enum: ['Utilities', 'Housing', 'Transportation', 'Medical', 'Pet', 'Credit Cards', 'Entertainment', 'Personal Care', 'Grocery', 'Dining', 'Subscription Services', 'Investments', 'Savings', 'Childcare', 'Student Loans', 'Clothing', 'Insurance', 'Other'],   
          },
          amount: String,
          receipt: {
             data: Buffer,
             contentType: String},
          paymentMethod: String,
          Date: Date,
          Comment: String,
        },
        { timestamps: true }
      )
    );
    return Expense;
}