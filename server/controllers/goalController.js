const Goal = require('../models/Goal');
const User = require('../models/User');

// @desc    Get all goals for logged in user
// @route   GET /api/goals
// @access  Private
exports.getGoals = async (req, res, next) => {
  try {
    const goals = await Goal.find({ user: req.user.id })
      .populate('platform', 'name logo')
      .populate('reward', 'name image');

    res.status(200).json({
      success: true,
      count: goals.length,
      data: goals,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single goal
// @route   GET /api/goals/:id
// @access  Private
exports.getGoal = async (req, res, next) => {
  try {
    const goal = await Goal.findById(req.params.id)
      .populate('platform', 'name logo description')
      .populate('reward', 'name image description pointsRequired');

    if (!goal) {
      return res.status(404).json({
        success: false,
        error: 'Goal not found',
      });
    }

    // Make sure user owns the goal
    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this goal',
      });
    }

    res.status(200).json({
      success: true,
      data: goal,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new goal
// @route   POST /api/goals
// @access  Private
exports.createGoal = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    const goal = await Goal.create(req.body);

    res.status(201).json({
      success: true,
      data: goal,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update goal progress
// @route   PUT /api/goals/:id/progress
// @access  Private
exports.updateGoalProgress = async (req, res, next) => {
  try {
    const { currentValue } = req.body;

    let goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({
        success: false,
        error: 'Goal not found',
      });
    }

    // Make sure user owns the goal
    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update this goal',
      });
    }

    // Update current value
    goal.currentValue = currentValue;

    // Check if goal is completed
    if (currentValue >= goal.targetValue && !goal.completed) {
      goal.completed = true;

      // Add points to user
      const user = await User.findById(req.user.id);
      user.points += 50; // Basic points for completing a goal
      await user.save();
    }

    await goal.save();

    res.status(200).json({
      success: true,
      data: goal,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
exports.deleteGoal = async (req, res, next) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({
        success: false,
        error: 'Goal not found',
      });
    }

    // Make sure user owns the goal
    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to delete this goal',
      });
    }

    await goal.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};