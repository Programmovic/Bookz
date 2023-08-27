const express = require('express');
const BookRouter = express.Router();
const Book = require('../models/Books'); // Assuming the Book schema is defined in a separate file


// Create a new book with photo upload
BookRouter.post('/', async (req, res) => {
  try {
      const newBook = new Book(req.body);
      await newBook.save();
      res.status(201).json(newBook);
  } catch (error) {
      res.status(500).json({ message: 'Failed to create Book', error });
  }
});

// Get all books
BookRouter.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single book by ID
BookRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a book by ID
BookRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a book by ID
BookRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBook = await Book.findByIdAndRemove(id);
    if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(deletedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = BookRouter;