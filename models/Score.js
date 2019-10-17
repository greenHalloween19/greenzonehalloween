const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
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
