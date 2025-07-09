const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

// get all games
router.get('/', async (req, res) => {
  try {
    const games = await Game.find().sort({ createdAt: -1 });
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get a single game
router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: 'Game not found' });
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// create game
router.post('/', async (req, res) => {
  const game = new Game({
    title: req.body.title,
    genre: req.body.genre,
    description: req.body.description,
    releaseYear: req.body.releaseYear,
    rating: req.body.rating,
    imageUrl: req.body.imageUrl
  });

  try {
    const newGame = await game.save();
    res.status(201).json(newGame);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// update game 
router.patch('/:id', async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!game) return res.status(404).json({ message: 'Game not found' });
    res.json(game);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// del game
router.delete('/:id', async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);
    if (!game) return res.status(404).json({ message: 'Game not found' });
    res.json({ message: 'Game deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;