const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { messages, sender } = require('../../helpers/response');
const { getGravatarURL } = require('./../../helpers/gravatar');

// Load User model
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    TESTS users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users works' }));

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
	User.findOne({ email: req.body.email }, (err, foundUser) => {
		if (err || foundUser)
			return sender(res, 400, { msg: messages.auth.invalidRegistration });

		const { name, email, password } = req.body;
		const avatar = getGravatarURL(email);

		bcrypt.hash(password, 10, (err, hash) => {
			if (err)
				return sender(res, 400, {
					msg: messages.auth.invalidRegistration
				});

			User.create({ name, email, password: hash, avatar }, (err, newUser) => {
				return err
					? sender(res, 400, { msg: messages.auth.invalidRegistration })
					: res.json(newUser);
			});
		});
	});
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
	const { email, password } = req.body;

	// Find user by email
	User.findOne({ email }).then(user => {
		// Check for user
		if (!user) return sender(res, 400, { msg: messages.auth.error });

		// Check Password
		bcrypt.compare(password, user.password).then(isMatch => {
			return isMatch
				? res.json({ msg: messages.auth.success })
				: sender(res, 400, { msg: messages.auth.error });
		});
	});
});

module.exports = router;
