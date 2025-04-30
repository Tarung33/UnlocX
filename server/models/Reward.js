const mongoose = require('mongoose');

const RewardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a reward name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters'],
  },
  image: {
    type: String,
    required: [true, 'Please add an image'],
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['subscription', 'discount', 'merchandise', 'food', 'other'],
  },
  pointsRequired: {
    type: Number,
    required: [true, 'Please add points required'],
  },
  provider: {
    type: String,
    required: [true, 'Please add a provider'],
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Reward', RewardSchema);