let books = require("../models/books");

/**
 * This function comment is parsed by doctrine
 * @route GET /book
 * @group Book
 * @returns {object} 200 - An array of book info
 * @returns {Error}  error fetching books
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
 * @group Book
 * @param {string} id.query.required - book id
 * @returns {object} 200 - Book details
 * @returns {Error}  book does not exist
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
 * @group Book
 * @param {string} title.body.required - book's title.
 * @param {number} years.body.required - book's years.
 * @param {number} pages.body.required - book's pages.
 * @returns {object} 200 - An array of book info
 * @returns {object} 200 - book successfully added
 * @returns {Error}  book does not exist
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
 * @route PUT /book/:id
 * @group Book
 * @param {string} id.query.required - book id
 * @param {string} title.body.required - book's title.
 * @param {number} years.body.required - book's years.
 * @param {number} pages.body.required - book's pages.
 * @returns {object} 200 - book successfully updated
 * @returns {Error}  an Error occured
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

/**
 * This function comment is parsed by doctrine
 * @route DELETE /book/:id
 * @group Book
 * @param {string} id.query.required - book id
 * @returns {object} 200 - book successfully deleted
 * @returns {Error}  an Error occured
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
