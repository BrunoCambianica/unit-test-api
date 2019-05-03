let books = require("../models/books");

/**
 * This function comment is parsed by doctrine
 * @route GET /book
 * @group list of books
 * @returns {object} 200 - An array of book info
 * @returns {Error}  default - Unexpected error
 */
const getBooks = (req, res) => {
  books.find({}, (err, data) => {
    err
      ? res.status(400).send({ message: "error fetching books" })
      : res.status(200).send({ books: data });
  });
};

/**
 * This function comment is parsed by doctrine
 * @route GET /book/:id
 * @param {string} id.query.required - book id
 * @returns {object} 200 - Book details
 * @returns {Error}  default - Unexpected error
 */
const getBook = (req, res) => {
  books.findById(req.params.id, (err, data) => {
    err
      ? res.status(400).send({ message: "book does not exist" })
      : res.status(200).send({
          book: data,
          message: "book fetched"
        });
  });
};

/**
 * This function comment is parsed by doctrine
 * @route POST /book
 * @param {Book.model} title.body.required - book's title.
 * @param {Book.model} years.body.required - book's years.
 * @param {Book.model} pages.body.required - book's pages.
 * @returns {object} 200 - An array of book info
 * @returns {Error}  default - Unexpected error
 */
const postBook = (req, res) => {
  let obj = new books(req.body);
  obj.save((err, data) => {
    err
      ? res.status(400).send({ message: "book does not exist" })
      : res.status(200).send({
          book: data,
          message: "book successfully added"
        });
  });
};

/**
 * This function comment is parsed by doctrine
 * @route PUT /book
 * @param {Book.model} title.body.required - book's title.
 * @param {Book.model} years.body.required - book's years.
 * @param {Book.model} pages.body.required - book's pages.
 * @returns {object} 200 - An array of book info
 * @returns {Error}  default - Unexpected error
 */
const updateBook = (req, res) => {
  books.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: false },
    (err, data) => {
      err
        ? res.status(400).send({ message: "an Error occured" })
        : res.status(200).send({ message: "book successfully updated" });
    }
  );
};

/*
 * DELETE /book/:id to delete a book given its id.
 */
const deleteBook = (req, res) => {
  books.remove({ _id: req.params.id }, (err, data) => {
    err
      ? res.status(400).send({ message: "an Error occured" })
      : res.status(200).send({ message: "book successfully deleted" });
  });
};

//export all the functions
export default { getBooks, postBook, getBook, deleteBook, updateBook };
