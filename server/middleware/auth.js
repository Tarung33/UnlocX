const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
    // console.log('Token received in protect middleware:', token);
  }

  // Make sure token exists
  if (!token) {
    // console.log('No token found in request headers');
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route',
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log('Token decoded:', decoded);

    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    console.log('Token verification error:', err.message);
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route',
    });
  }
};

