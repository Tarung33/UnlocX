const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a goal title'],
    trim: true,
    maxlength: [50, 'Title cannot be more than 50 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters'],
  },
  platform: {
    type: mongoose.Schema.ObjectId,
    ref: 'Platform',
    required: [true, 'Please select a learning platform'],
  },
  targetValue: {
    type: Number,
    required: [true, 'Please add a target value (number of modules, courses, etc.)'],
  },
  currentValue: {
    type: Number,
    default: 0,
  },
  reward: {
    type: mongoose.Schema.ObjectId,
    ref: 'Reward',
    required: [true, 'Please select a reward'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  deadline: {
    type: Date,
    required: [true, 'Please add a deadline'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Goal', GoalSchema);
