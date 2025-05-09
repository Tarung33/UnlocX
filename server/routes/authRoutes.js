const express = require('express');
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { validate, validateUser } = require('../utils/validation');

const router = express.Router();

const { guestLogin } = require('../controllers/guestController');

router.post('/register', validate(validateUser), register);
router.post('/login', login);
router.post('/guest-login', guestLogin);
router.get('/me', protect, getMe);

module.exports = router;
