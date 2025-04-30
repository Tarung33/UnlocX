const mongoose = require('mongoose');

const PlatformSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a platform name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters'],
  },
  logo: {
    type: String,
    required: [true, 'Please add a logo'],
  },
  apiEndpoint: {
    type: String,
    required: [true, 'Please add an API endpoint'],
  },
  apiAuthType: {
    type: String,
    enum: ['oauth', 'apikey', 'none'],
    default: 'none',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Platform', PlatformSchema);