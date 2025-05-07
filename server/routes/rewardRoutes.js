const express = require('express');
const {
  getRewards,
  getReward,
  claimReward,
  getFeaturedRewards,
} = require('../controllers/rewardController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(getRewards);
router.route('/featured').get(getFeaturedRewards);
router.route('/:id').get(getReward);
router.route('/:id/claim').post(protect, claimReward);

module.exports = router;
