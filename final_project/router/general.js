const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here

  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(books)
    }, 500)});

  myPromise.then((data) => {
    return res.send(data);
  })  
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;

  let myPromise = new Promise((resolve,reject) => {
    if(books.hasOwnProperty(isbn)) {
        resolve(books[isbn]); 
    } else {
        reject("ISBN not found!"); 
    }  
  });

  myPromise.then((data) => {
    return res.send(data);
  },
  (err) => {
    return res.send(err);
  });
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;

  let myPromise = new Promise((resolve,reject) => {
    let arr = [];
    for (const key in books) {
      let book = books[key];
      if (book.author == author) {
          arr.push(book);
      }
    }
    if (arr.length > 0) {
      resolve(arr);
    } else {
      reject("Author not found");  
    }
  });

  myPromise.then((data) => {
    return res.send(data);
  },
  (err) => {
    return res.send(err);
  });
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;

  let myPromise = new Promise((resolve,reject) => {
    let arr = [];
    for (const key in books) {
      let book = books[key];
      if (book.title == title) {
          arr.push(book);
      }
    }
    if (arr.length > 0) {
      resolve(arr);
    } else {
      reject("Title not found");  
    }
  });

  myPromise.then((data) => {
    return res.send(data);
  },
  (err) => {
    return res.send(err);
  });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;

  if(books.hasOwnProperty(isbn)) {
    res.send(books[isbn].reviews); 
  } else {
    res.send("ISBN not found!"); 
  }
});

module.exports.general = public_users;
