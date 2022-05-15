module.exports = mongoose => {
    const Expense = mongoose.model(
      "expense",
      mongoose.Schema(
        {
          title: String,
          description: String,
          published: Boolean
        },
        { timestamps: true }
      )
    );
    return Expense;
}