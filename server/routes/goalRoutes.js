const express = require('express');
const {
  getGoals,
  getGoal,
  createGoal,
  updateGoalProgress,
  deleteGoal,
} = require('../controllers/goalController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/').get(getGoals).post(createGoal);
router.route('/:id').get(getGoal).delete(deleteGoal);
router.route('/:id/progress').put(updateGoalProgress);

module.exports = router;
