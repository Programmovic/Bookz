const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  sellerID: { type: String, required: true },
  bookName: { type: String, required: true },
  author: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  discountedPrice: { type: Number, required: true },
  discountPercent: { type: Number, required: true },
  imgSrc: { type: String, required: true },
  imgAlt: { type: String, required: true },
  badgeText: { type: String },
  outOfStock: { type: Boolean, default: false },
  fastDeliveryAvailable: { type: Boolean, default: false },
  genre: { type: String },
  rating: { type: Number },
  description: { type: String }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;