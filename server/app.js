const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Route files
const authRoutes = require('./routes/authRoutes');
const goalRoutes = require('./routes/goalRoutes');
const platformRoutes = require('./routes/platformRoutes');

const path = require('path');
const rewardRoutes = require('./routes/rewardRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/platforms', platformRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/users', userRoutes);

if (process.env.NODE_ENV === 'development') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
  );
} else {
  // Serve static files from client/public in development mode
  app.use(express.static(path.join(__dirname, '../client/public')));
}

// Error handler
app.use(errorHandler);

module.exports = app;
