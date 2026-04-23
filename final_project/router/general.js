const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
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
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
