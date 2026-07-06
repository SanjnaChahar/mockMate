const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  mode: {
    type: String,
    enum: ['topic', 'role'],
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  totalQuestions: {
    type: Number,
    default: 5,
  },
  averageScore: {
    type: Number,
    default: 0,
  },
  completed: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('Session', sessionSchema)