const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  labSession: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LabSession',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comment', CommentSchema);