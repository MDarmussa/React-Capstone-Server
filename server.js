const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require('./app/routes/user.routes')
const expenseRouter = require('./app/routes/expense.routes')
var corsOptions = {
  origin: "http://localhost:8081"
};


app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// the database
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// place these at the beginning of the routing connections string
app.use('/user', userRouter)
app.use('/expense', expenseRouter)

// simple route
app.get("/", (req, res) => {
  // interact with the model to get json from db and then send that
  let data = { message: "Welcome to bezkoder application." }
  res.json(data);
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});