let books = require("../models/books");

/*
 * GET /book route to retrieve all books.
 */
const getBooks = (req, res) => {
  books.find({}, (err, data) => {
    err
      ? res.status(400).send({ message: "error fetching books" })
      : res.status(200).send({ books: data });
  });
};

/*
 * GET /book/:id route to retrieve a book given its id.
 */
const getBook = (req, res) => {
  books.findById(req.params.id, (err, data) => {
    err
      ? res.status(400).send({ message: "book does not exist" })
      : res.status(200).send({
        book: data,
        message: 'book successfully added'
      });
  });
};

/*
 * POST /book to save a new book.
 */
const postBook = (req, res) => {
  let obj = new books(req.body);
  obj.save((err, data) => {
    err
      ? res.status(400).send({ message: "book does not exist" })
      : res.status(200).send({
        book: data,
        message: 'book fetched'
      });
  });
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

/*
 * PUT /book/:id to updatea a book given its id
 */
const updateBook = (req, res) => {
  books.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: false },
    (err, data) => {
      err
        ? res.status(400).send({ message: "an Error occured" })
        : res.status(200).send({
          book: data,
          message: 'book successfully updated'
        });
    }
  );
};

//export all the functions
export default { getBooks, postBook, getBook, deleteBook, updateBook };
