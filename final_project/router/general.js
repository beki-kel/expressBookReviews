const express = require('express');
const axios = require('axios');

const general = express.Router();

// Task 10: Get the list of books available in the shop using async-await with Axios
general.get('/', async function (req, res) {
  try {
    const response = await axios.get('http://your-api-url/books');
    const books = response.data;
    return res.status(200).json({ books: books });
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving books." });
  }
});

// Task 11: Get book details based on ISBN using async-await with Axios
general.get('/isbn/:isbn', async function (req, res) {
  const { isbn } = req.params;
  try {
    const response = await axios.get(`http://your-api-url/books/isbn/${isbn}`);
    const book = response.data;
    return res.status(200).json({ book: book });
  } catch (error) {
    return res.status(404).json({ message: "Book not found." });
  }
});

// Task 12: Get book details based on Author using async-await with Axios
general.get('/author/:author', async function (req, res) {
  const { author } = req.params;
  try {
    const response = await axios.get(`http://your-api-url/books/author/${author}`);
    const booksByAuthor = response.data;
    return res.status(200).json({ books: booksByAuthor });
  } catch (error) {
    return res.status(404).json({ message: "No books found by this author." });
  }
});

// Task 13: Get book details based on Title using async-await with Axios
general.get('/title/:title', async function (req, res) {
  const { title } = req.params;
  try {
    const response = await axios.get(`http://your-api-url/books/title/${title}`);
    const booksByTitle = response.data;
    return res.status(200).json({ books: booksByTitle });
  } catch (error) {
    return res.status(404).json({ message: "No books found with this title." });
  }
});

module.exports.general = general;
