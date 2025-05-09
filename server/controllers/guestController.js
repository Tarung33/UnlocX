const jwt = require('jsonwebtoken');

// @desc    Guest login
// @route   POST /api/auth/guest-login
// @access  Public
exports.guestLogin = async (req, res, next) => {
  try {
    // Create a guest user token with limited privileges
    const guestUser = {
      id: 'guest',
      name: 'Guest User',
      email: 'guest@example.com',
      role: 'guest',
    };

    const token = jwt.sign(guestUser, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || '1h',
    });

    res.status(200).json({
      success: true,
      token,
      user: guestUser,
    });
  } catch (err) {
    next(err);
  }
};
