const mongoose = require('mongoose');
//
const GameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  genre: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  releaseYear: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/300'
  }
}, { timestamps: true });

module.exports = mongoose.model('Game', GameSchema);