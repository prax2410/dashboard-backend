const express = require("express");
const cors = require('cors');
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();

// import routes
const database = require("./Routes/Database");

// app
const app = express();
const port = process.env.PORT || 3002;

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

// Routes middlewares
app.use("/database", database);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});