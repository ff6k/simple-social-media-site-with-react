const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const { messages, sender } = require('../../helpers/response');

// Load Profile Model
const Profile = require('../../models/Profile');

// Load User Profile
const User = require('../../models/User');

// Validate Input
const ValidateProfileInput = require('../../validation/profile');

// @route   GET api/profile/test
// @desc    TESTS profile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile works' }));

// @route   GET api/profile
// @desc    Get current user's profile
// @access  Private
router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = ValidateProfileInput(req.body);

		Profile.findOne({ user: req.user.id })
			.then(profile => {
				if (!profile) {
					errors.noprofile = messages.profile.noprofile;
					sender(res, 404, errors);
				} else {
					res.json(profile);
				}
			})
			.catch(err => sender(res, 404, err));
	}
);

module.exports = router;
