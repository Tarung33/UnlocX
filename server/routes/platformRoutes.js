const express = require('express');
const {
  getPlatforms,
  getPlatform,
  connectPlatform,
  disconnectPlatform,
} = require('../controllers/platformController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(getPlatforms);
router.route('/:id').get(getPlatform);
router.route('/:id/connect').post(protect, connectPlatform).delete(protect, disconnectPlatform);

module.exports = router;
