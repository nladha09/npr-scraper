const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const db = require("./models");

const PORT = process.env.PORT || 3000;

const app = express();

// morgan logger for logging requests
app.use(logger('dev'));

// handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// express.static to serve the public folder as a static directory
app.use(express.static("public"));

// routes
const routes = require("./routes");
// all requests go through routes
app.use(routes);

// if deployed, use the deployed database. Otherwise use the local mongoHeadlines database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// set mongoose to leverage built-in JavaScript ES6 Promises
// connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// start server
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});