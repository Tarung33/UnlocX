const Platform = require('../models/Platform');
const User = require('../models/User');

// @desc    Get all platforms
// @route   GET /api/platforms
// @access  Public
exports.getPlatforms = async (req, res, next) => {
  try {
    const platforms = await Platform.find();

    res.status(200).json({
      success: true,
      count: platforms.length,
      data: platforms,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single platform
// @route   GET /api/platforms/:id
// @access  Public
exports.getPlatform = async (req, res, next) => {
  try {
    const platform = await Platform.findById(req.params.id);

    if (!platform) {
      return res.status(404).json({
        success: false,
        error: 'Platform not found',
      });
    }

    res.status(200).json({
      success: true,
      data: platform,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Connect user to platform
// @route   POST /api/platforms/:id/connect
// @access  Private
exports.connectPlatform = async (req, res, next) => {
  try {
    const platform = await Platform.findById(req.params.id);

    if (!platform) {
      return res.status(404).json({
        success: false,
        error: 'Platform not found',
      });
    }

    // Check if user already connected to this platform
    const user = await User.findById(req.user.id);

    if (user.connectedPlatforms.includes(platform._id)) {
      return res.status(400).json({
        success: false,
        error: 'Already connected to this platform',
      });
    }

    // Add platform to user's connected platforms
    user.connectedPlatforms.push(platform._id);
    await user.save();

    res.status(200).json({
      success: true,
      data: platform,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Disconnect user from platform
// @route   DELETE /api/platforms/:id/connect
// @access  Private
exports.disconnectPlatform = async (req, res, next) => {
  try {
    const platform = await Platform.findById(req.params.id);

    if (!platform) {
      return res.status(404).json({
        success: false,
        error: 'Platform not found',
      });
    }

    // Check if user connected to this platform
    const user = await User.findById(req.user.id);

    if (!user.connectedPlatforms.includes(platform._id)) {
      return res.status(400).json({
        success: false,
        error: 'Not connected to this platform',
      });
    }

    // Remove platform from user's connected platforms
    user.connectedPlatforms = user.connectedPlatforms.filter(
      (p) => p.toString() !== platform._id.toString()
    );
    await user.save();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};