const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const {
	messages,
	sender,
	sendInternalError
} = require('../../helpers/response');

const CoreValidation = require('../../validation/core-validation');

// Load Profile Model
const Profile = require('../../models/Profile');

// Load User Profile
const User = require('../../models/User');

// Validate Input
const ValidateProfileInput = require('../../validation/profile');

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
			.catch(err => sendInternalError(res));
	}
);

// @route   POST api/profile
// @desc    Create user profile
// @access  Private
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		//const { errors, isValid } = ValidateProfileInput(req.body);

		// Load Profile with Request
		const profileFields = {};
		profileFields.user = req.user.id;

		const standardFields = [
				'handle',
				'company',
				'website',
				'location',
				'bio',
				'status',
				'skills',
				'githubprofile'
			],
			socialFields = [
				'youtube',
				'twitter',
				'facebook',
				'linkedin',
				'instagram'
			];

		standardFields.forEach(field => {
			if (field === 'skills' && !CoreValidation.isEmpty(req.body.skills)) {
				profileFields.skills = req.body.skills.split(',');
			} else {
				if (req.body[field]) profileFields[field] = req.body[field];
			}
		});

		profileFields.social = {};

		socialFields.forEach(field => {
			if (req.body[field]) profileFields.social[field] = req.body[field];
		});

		Profile.findOne({ handle: profileFields.handle })
			.then(profile => {
				// Check if handle exists
				if (profile && profile.user != req.user.id) {
					errors.handle = messages.profile.handleExists;
					sender(res, 400, errors);
				} else {
					Profile.findOne({ user: req.user.id })
						.then(profile => {
							// Update Profile
							if (profile) {
								Profile.findOneAndUpdate(
									{ user: req.user.id },
									{ $set: profileFields },
									{ new: true }
								)
									.then(profile => {
										res.json(profile);
									})
									.catch(err => sendInternalError(res));
							} else {
								// Create Profile
								new Profile(profileFields)
									.save()
									.then(profile => {
										res.json(profile);
									})
									.catch(err => sendInternalError(res));
							}
						})
						.catch(err => sendInternalError(res));
				}
			})
			.catch(err => sendInternalError(res));
	}
);

module.exports = router;
