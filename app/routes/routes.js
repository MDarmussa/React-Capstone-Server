module.exports = (app) => {
  const expense = require("../controllers/controller.js");
  var router = require("express").Router();
  // Create a new expense
  router.post("/register", user.create);
  router.post("/:id", expense.create);
  // Retrieve all expense
  router.get("/:id", expense.findAll);
  // Retrieve a single expense with id
  router.get("/:id", expense.findOne);
  // Update a expense with id
  router.put("/:id", expense.update);
  // Delete a expense with id
  router.delete("/:id", expense.delete);
  // Create a new expense
  router.delete("/", expense.deleteAll);
  app.use("/api/expense", router);
};
