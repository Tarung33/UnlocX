const Reward = require('../models/Reward');
const User = require('../models/User');

// @desc    Get all rewards
// @route   GET /api/rewards
// @access  Public
exports.getRewards = async (req, res, next) => {
  try {
    const rewards = await Reward.find({ active: true });

    res.status(200).json({
      success: true,
      count: rewards.length,
      data: rewards,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single reward
// @route   GET /api/rewards/:id
// @access  Public
exports.getReward = async (req, res, next) => {
  try {
    const reward = await Reward.findById(req.params.id);

    if (!reward) {
      return res.status(404).json({
        success: false,
        error: 'Reward not found',
      });
    }

    res.status(200).json({
      success: true,
      data: reward,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Claim a reward
// @route   POST /api/rewards/:id/claim
// @access  Private
exports.claimReward = async (req, res, next) => {
  try {
    const reward = await Reward.findById(req.params.id);

    if (!reward) {
      return res.status(404).json({
        success: false,
        error: 'Reward not found',
      });
    }

    // Check if user has enough points
    const user = await User.findById(req.user.id);

    if (user.points < reward.pointsRequired) {
      return res.status(400).json({
        success: false,
        error: 'Not enough points to claim this reward',
      });
    }

    // Deduct points from user
    user.points -= reward.pointsRequired;
    await user.save();

    // In a real application, you would handle the actual reward delivery here
    // For now, just return success

    res.status(200).json({
      success: true,
      message: 'Reward claimed successfully',
      data: {
        reward,
        userPoints: user.points,
      },
    });
  } catch (err) {
    next(err);
  }
};
