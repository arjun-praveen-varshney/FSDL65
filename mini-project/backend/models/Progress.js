const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  labSession: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LabSession',
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['not-started', 'in-progress', 'completed'],
    default: 'not-started'
  },
  milestones: [
    {
      id: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      description: {
        type: String
      },
      status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
      },
      completedAt: {
        type: Date
      }
    }
  ],
  submissionUrl: {
    type: String
  },
  feedback: {
    type: String
  },
  grade: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create compound index to ensure a student can only have one progress record per lab
ProgressSchema.index({ labSession: 1, student: 1 }, { unique: true });

module.exports = mongoose.model('Progress', ProgressSchema);