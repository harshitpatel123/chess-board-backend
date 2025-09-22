const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  boxId: {
    type: Number,
    required: true
  },
  undo: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Game', GameSchema);