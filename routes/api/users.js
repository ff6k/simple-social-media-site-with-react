const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { messages, sender } = require('../../helpers/response');
const { getGravatarURL } = require('./../../helpers/gravatar');
const keys = require('../../config/keys');

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
			if (isMatch) {
				// Create JWT Payload
				const payload = {
					id: user.id,
					name: user.name,
					avatar: user.avatar
				};

				// Sign Token
				jwt.sign(
					payload,
					keys.secretOrKey,
					{ expiresIn: 3600 },
					(err, token) => {
						if (err) sender(res, 400, { msg: messages.auth.error });

						res.json({
							success: true,
							token: 'Bearer ' + token
						});
					}
				);
			} else {
				sender(res, 400, { msg: messages.auth.error });
			}
		});
	});
});

module.exports = router;
