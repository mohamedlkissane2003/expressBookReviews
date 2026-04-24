const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {

  const { username, password } = req.body;


  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  if (!isValid(username)) {
    return res.status(404).json({ message: "User already exists" });
  }

  users.push({ username, password });

  return res.status(200).json({ message: "User registered successfully" });
});
// Get the book list available in the shop
public_users.get('/', async function (req, res) {
  const getBooks = new Promise((resolve, reject) => {
    resolve(books);
  });

  let data = await getBooks;
  return res.status(200).json(data);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  const isbn = req.params.isbn;

  const getBook = new Promise((resolve, reject) => {
    resolve(books[isbn]);
  });

  let data = await getBook;
  return res.status(200).json(data);
});
  
// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;

  const getBooksByAuthor = new Promise((resolve, reject) => {
    let result = [];

    for (let key in books) {
      if (books[key].author === author) {
        result.push(books[key]);
      }
    }

    resolve(result);
  });

  let data = await getBooksByAuthor;
  return res.status(200).json(data);
});

// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title;

  const getBooksByTitle = new Promise((resolve, reject) => {
    let result = [];

    for (let key in books) {
      if (books[key].title === title) {
        result.push(books[key]);
      }
    }

    resolve(result);
  });

  let data = await getBooksByTitle;
  return res.status(200).json(data);
});

//  Get book review
public_users.get('/books/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  return res.status(200).json(books[isbn].reviews);
});

module.exports.general = public_users;
