const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit')
const authCtrl = require('../controllers/auth');

const createAccountLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 5, // Limit each IP to 5 create account requests per `window` (here, per hour)
	message:
		'Too many accounts created from this IP, please try again after an hour',
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})


// signup
router.post('/signup', createAccountLimiter, authCtrl.signup);

// login    
router.post('/login', authCtrl.login);

module.exports = router;