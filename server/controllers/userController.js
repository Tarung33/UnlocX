const Goal = require('../models/Goal');
const User = require('../models/User');

// @desc    Get user stats
// @route   GET /api/users/stats
// @access  Private

exports.getUserStats = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Count completed goals for user
    const completedGoalsCount = await Goal.countDocuments({ user: userId, completed: true });

    // Get user points
    const user = await User.findById(userId);

    const stats = {
      completedGoals: completedGoalsCount,
      totalPoints: user ? user.points : 0,
      currentStreak: 0, // TODO: implement streak calculation
      longestStreak: 0, // TODO: implement streak calculation
    };

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
