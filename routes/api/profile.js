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
const ValidateExperienceInput = require('../../validation/experience');
const ValidateEducationInput = require('../../validation/education');

// @route   GET api/profile
// @desc    Get current user's profile
// @access  Private
router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const errors = {};

		Profile.findOne({ user: req.user.id })
			.populate('user', ['name', 'avatar'])
			.then(profile => {
				if (!profile) {
					errors.profile = messages.profile.noProfile;
					return sender(res, 404, errors);
				}
				res.json(profile);
			})
			.catch(err => {
				errors.profile = messages.profile.noProfile;
				return sender(res, 404, errors);
			});
	}
);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
	const errors = {};

	Profile.find()
		.populate('user', ['name', 'avatar'])
		.then(profiles => {
			if (!profiles) {
				errors.profile = 'There are no profiles';
				return sender(res, 404, errors);
			}
			res.json(profiles);
		})
		.catch(err => {
			errors.profile = 'There are no profiles';
			return sender(res, 404, errors);
		});
});

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
	const errors = {};
	Profile.findOne({ handle: req.params.handle })
		.populate('user', ['name', 'avatar'])
		.then(profile => {
			if (!profile) {
				errors.profile = messages.profile.noProfile;
				return sender(res, 404, errors);
			}
			res.json(profile);
		})
		.catch(err => {
			errors.profile = messages.profile.noProfile;
			return sender(res, 404, errors);
		});
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Public
router.get('/user/:user_id', (req, res) => {
	const errors = {};

	Profile.findOne({ user: req.params.user_id })
		.populate('user', ['name', 'avatar'])
		.then(profile => {
			if (!profile) {
				errors.profile = messages.profile.noProfile;
				return sender(res, 404, errors);
			}
			res.json(profile);
		})
		.catch(err => {
			errors.profile = messages.profile.noProfile;
			return sender(res, 404, err);
		});
});

// @route   POST api/profile
// @desc    Create user profile
// @access  Private
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = ValidateProfileInput(req.body);

		// check validation
		if (!isValid) {
			return sender(res, 400, errors);
		}

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
				profileFields.skills = req.body.skills
					.split(',')
					.map(item => item.trim());
			} else {
				if (req.body[field]) profileFields[field] = req.body[field];
			}
		});

		profileFields.social = {};

		socialFields.forEach(field => {
			if (req.body[field]) profileFields.social[field] = req.body[field];
		});

		Profile.findOne({ handle: profileFields.handle }).then(profile => {
			// Check if handle exists
			if (profile && profile.user != req.user.id) {
				errors.handle = messages.profile.handleExists;
				return sender(res, 400, errors);
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
								.catch(err => {
									errors.profile =
										'An error occurred while trying to update the profile';
									return sender(res, 404, errors);
								});
						} else {
							// Create Profile
							new Profile(profileFields)
								.save()
								.then(profile => {
									res.json(profile);
								})
								.catch(err => {
									errors.profile =
										'An error occurred while trying to create the profile';
									return sender(res, 404, errors);
								});
						}
					})
					.catch(err => {
						errors.profile = messages.profile.noProfile;
						return sender(res, 404, errors);
					});
			}
		});
	}
);

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post(
	'/experience',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = ValidateExperienceInput(req.body);

		// check validation
		if (!isValid) {
			return sender(res, 400, errors);
		}

		Profile.findOne({ user: req.user.id }).then(profile => {
			const newExp = req.body;
			//Add to experience array
			profile.experience.unshift(newExp);
			profile.save().then(profile => res.json(profile));
		});
	}
);

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post(
	'/education',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = ValidateEducationInput(req.body);

		// check validation
		if (!isValid) {
			return sender(res, 400, errors);
		}

		Profile.findOne({ user: req.user.id }).then(profile => {
			const newEdu = req.body;
			//Add to education array
			profile.education.unshift(newEdu);
			profile.save().then(profile => res.json(profile));
		});
	}
);

module.exports = router;
