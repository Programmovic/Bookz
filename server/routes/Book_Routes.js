const express = require('express');
const BookRouter = express.Router();
const multer = require('multer');
const Book = require('../models/Books'); // Assuming the Book schema is defined in a separate file

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory where uploaded files should be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split('.').pop();
    cb(null, uniqueSuffix + '.' + fileExtension); // Set the filename to be unique
  },
});
// Create a Multer upload instance
const upload = multer({ storage: storage });
// Create a new book with photo upload
BookRouter.post('/', upload.single('photo'), async (req, res) => {
  try {
    const {
      sellerID,
      bookName,
      author,
      originalPrice,
      discountedPrice,
      discountPercent,
      imgAlt,
      badgeText,
      outOfStock,
      fastDeliveryAvailable,
      genre,
      rating,
      description,
    } = req.body;
    const photo = req.file;

    // Handle if no photo is uploaded
    if (!photo) {
      return res.status(400).json({ error: 'No photo uploaded' });
    }

    // Create a new book instance with the uploaded photo
    const newBook = new Book({
      sellerID,
      bookName,
      author,
      originalPrice,
      discountedPrice,
      discountPercent,
      imgSrc: photo.path, // Save the path of the uploaded photo to the book's 'imgSrc' field
      imgAlt,
      badgeText,
      outOfStock,
      fastDeliveryAvailable,
      genre,
      rating,
      description,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
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