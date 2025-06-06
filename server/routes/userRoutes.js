const express = require('express');
const userController = require('../controllers/userController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/stats', protect, userController.getUserStats);
router.get('/', protect, userController.getUsers);

module.exports = router;
