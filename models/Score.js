const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
  characterId: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  }
});

module.exports = Score = mongoose.model('score', ScoreSchema);
