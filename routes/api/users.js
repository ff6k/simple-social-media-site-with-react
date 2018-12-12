const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
	messages,
	sender,
	sendInternalError
} = require('../../helpers/response');
const { getGravatarURL } = require('./../../helpers/gravatar');
const keys = require('../../config/keys');
const passport = require('passport');

// Validate Input
const ValidateRegisterInput = require('../../validation/register');
const ValidateLoginInput = require('../../validation/login');

// Load User model
const User = require('../../models/User');

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
	const { errors, isValid } = ValidateRegisterInput(req.body);

	// check validation
	if (!isValid) {
		return sender(res, 400, errors);
	}

	User.findOne({ email: req.body.email }, (err, foundUser) => {
		if (err || foundUser) {
			errors.error = messages.auth.invalidRegistration;
			return sender(res, 400, errors);
		}

		const { name, email, password } = req.body;
		const avatar = getGravatarURL(email);

		bcrypt.hash(password, 10, (err, hash) => {
			if (err) {
				errors.error = messages.auth.invalidRegistration;
				return sender(res, 400, errors);
			}

			User.create({ name, email, password: hash, avatar }, (err, newUser) => {
				if (err) {
					errors.error = messages.auth.invalidRegistration;
					return sender(res, 400, errors);
				} else {
					res.json(newUser);
				}
			});
		});
	});
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
	const { errors, isValid } = ValidateLoginInput(req.body);

	// check validation
	if (!isValid) {
		return sender(res, 400, errors);
	}

	const { email, password } = req.body;

	// Find user by email
	User.findOne({ email }).then(user => {
		// Check for user
		if (!user) {
			errors.error = messages.auth.error;
			return sender(res, 400, errors);
		}

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
					{ expiresIn: 86400 }, // 1 day
					(err, token) => {
						if (err) {
							errors.error = messages.auth.error;
							return sender(res, 400, errors);
						}
						res.json({
							success: true,
							token: 'Bearer ' + token
						});
					}
				);
			} else {
				errors.error = messages.auth.error;
				return sender(res, 400, errors);
			}
		});
	});
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
	'/current',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		res.json({
			id: req.user.id,
			name: req.user.name,
			email: req.user.email
		});
	}
);

module.exports = router;
