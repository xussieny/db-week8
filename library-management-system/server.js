const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'LibraryManagement'
});

// Connect to database
db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

// CRUD operations for Books

// Create a Book
app.post('/books', (req, res) => {
  const { title, author_id, published_year, isbn } = req.body;
  const query = 'INSERT INTO Books (title, author_id, published_year, isbn) VALUES (?, ?, ?, ?)';
  db.query(query, [title, author_id, published_year, isbn], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ id: result.insertId });
  });
});

// Read all Books
app.get('/books', (req, res) => {
  db.query('SELECT * FROM Books', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

// Update a Book
app.put('/books/:id', (req, res) => {
  const { title, author_id, published_year, isbn } = req.body;
    const query = 'UPDATE Books SET title = ?, author_id = ?, published_year = ?, isbn = ? WHERE book_id = ?';
  db.query(query, [title, author_id, published_year, isbn, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Book updated successfully' });
  });
});

// Delete a Book
app.delete('/books/:id', (req, res) => {
  const query = 'DELETE FROM Books WHERE book_id = ?';
  db.query(query, [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Book deleted successfully' });
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running on port ${PORT}');
});

