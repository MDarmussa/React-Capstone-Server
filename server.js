const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require('./app/routes/user.routes')
const expenseRouter = require('./app/routes/expense.routes')
require("dotenv").config()
var corsOptions = {
  origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept', 
};

app.use(cors(corsOptions));
app.use(express.json());
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

app.use('/user', userRouter)
app.use('/expense', expenseRouter)

app.get("/", (req, res) => {
  let data = { message: "Welcome to Spence App" }
  res.json(data);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});