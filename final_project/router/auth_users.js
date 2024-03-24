const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  // Check if the username already exists
  return users.some(user => user.username === username);
};

// Route for registering a new user
regd_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  // Check if the username already exists
  if (isValid(username)) {
    return res.status(400).json({ message: "Username already exists." });
  }

  // Add the new user to the users array
  users.push({ username, password });
  return res.status(200).json({ message: "Registration successful." });
});

// Route for user login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  // Check if the user exists and password matches
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    // If authenticated, generate JWT token
    const token = jwt.sign({ username }, 'secret_key');
    // Store token in session
    req.session.token = token;
    return res.status(200).json({ message: "Login successful.", token });
  } else {
    return res.status(401).json({ message: "Invalid username or password." });
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;