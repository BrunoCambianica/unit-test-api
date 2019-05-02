import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

import book from "./routes/books";
import config from "config";


let mongoose = require("mongoose");
let port = 8080;
let app = express();

//don't show the log when it is test
if (config.util.getEnv("NODE_ENV") !== "test") {
  //use morgan to log at command line
  app.use(morgan("combined")); //'combined' outputs the Apache style LOGs
}

// connection to db
const confMongo = require("./config/config-mongo");



// mongodb connection
mongoose.connect(confMongo.database);

//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));

// token security except authentication
// app.use(expressJWT({ secret: this.publicKey }).unless({ path: ['/authentication'] }));

app.get("/", (req, res) => res.json({ message: "Welcome to our Bookstore!" }));

app
  .route("/book")
  .get(book.getBooks)
  .post(book.postBook);

app
  .route("/book/:id")
  .get(book.getBook)
  .delete(book.deleteBook)
  .put(book.updateBook);

app.listen(port);
console.log("Listening on port " + port);

module.exports = app;
