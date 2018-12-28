const express = require('express');
const router = express.Router();
//const mongoose = require('mongoose');
const passport = require('passport');
const requireLogin = passport.authenticate('jwt', { session: false });

const { messages, sender } = require('../../helpers/response');

const CoreValidation = require('../../validation/core-validation');

// Load Profile Model
const Profile = require('../../models/Profile');

// Load User Model
const User = require('../../models/User');

// Validate Input
const ValidateProfileInput = require('../../validation/profile');
const ValidateExperienceInput = require('../../validation/experience');
const ValidateEducationInput = require('../../validation/education');

const routeAction = require('./route-actions');

// @route   GET api/profile
// @desc    Get current user's profile
// @access  Private
router.get('/', requireLogin, (req, res) => {
	//routeAction.findProfile({ user: req.user.id }, res);
	Profile.findOne({ user: req.user.id })
		.populate('user', ['name', 'avatar'])
		.then(profile => {
			if (!profile) {
				return res.status(404).json({ error: 'There are no profiles' });
			}
			res.json(profile);
		})
		.catch(err => {
			res.status(404).json({ error: 'There are no profiles' });
		});
});

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => routeAction.findProfile({}, res));

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
	//routeAction.findProfile({ handle: req.params.handle }, res)
	Profile.find({ handle: req.params.handle })
		.populate('user', ['name', 'avatar'])
		.then(profile => {
			if (!profile) {
				return res.status(404).json({ error: 'There are no profiles' });
			}
			res.json(profile);
		})
		.catch(err => {
			res.status(404).json({ error: 'There are no profiles' });
		});
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Public
router.get('/user/:user_id', (req, res) =>
	routeAction.findProfile({ user: req.params.user_id }, res)
);

// @route   POST api/profile
// @desc    Create user profile
// @access  Private
router.post('/', requireLogin, (req, res) => {
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
		socialFields = ['youtube', 'twitter', 'facebook', 'linkedin', 'instagram'];

	standardFields.forEach(field => {
		if (field === 'skills' && !CoreValidation.isEmpty(req.body.skills)) {
			profileFields.skills = req.body.skills;
		} else {
			profileFields[field] = req.body[field];
		}
	});

	profileFields.social = {};

	socialFields.forEach(field => {
		profileFields.social[field] = req.body[field];
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
								return sender(res, 400, errors);
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
								return sender(res, 400, errors);
							});
					}
				})
				.catch(err => {
					errors.profile = messages.profile.noProfile;
					return sender(res, 404, errors);
				});
		}
	});
});

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post('/experience', requireLogin, (req, res) => {
	const { errors, isValid } = ValidateExperienceInput(req.body);

	// check validation
	if (!isValid) {
		return sender(res, 400, errors);
	}

	const experience = req.body,
		user = { user: req.user.id };

	routeAction
		.addToArray(Profile, user, 'experience', experience, res)
		.catch(err => {
			errors.error = messages.profile.noProfile;
			sender(res, 404, errors);
		});
});

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post('/education', requireLogin, (req, res) => {
	const { errors, isValid } = ValidateEducationInput(req.body);

	// check validation
	if (!isValid) {
		return sender(res, 400, errors);
	}

	const education = req.body,
		user = { user: req.user.id };

	routeAction
		.addToArray(Profile, user, 'education', education, res)
		.catch(err => {
			errors.error = messages.profile.noProfile;
			sender(res, 404, errors);
		});
});

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete('/experience/:exp_id', requireLogin, (req, res) => {
	const user = { user: req.user.id },
		expId = req.params.exp_id;

	routeAction
		.deleteFromArrayByUser(Profile, user, 'experience', expId, res)
		.catch(err =>
			sender(res, 400, 'Unable to delete experience from user profile.')
		);
});

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete('/education/:edu_id', requireLogin, (req, res) => {
	const user = { user: req.user.id },
		eduId = req.params.edu_id;

	routeAction
		.deleteFromArrayByUser(Profile, user, 'education', eduId, res)
		.catch(err =>
			sender(res, 400, 'Unable to delete education from user profile.')
		);
});

// @route   DELETE api/profile
// @desc    Delete user from profile
// @access  Private
router.delete('/', requireLogin, (req, res) => {
	Profile.findOneAndRemove({ user: req.user.id })
		.then(profile => {
			User.findOneAndRemove({ _id: req.user.id })
				.then(user =>
					res.json({
						email: user.email,
						message:
							'Successfully deleted user' + (profile ? ' and profile.' : '.'),
						name: user.name,
						profileId: profile ? profile.id : null,
						userId: user.id
					})
				)
				.catch(err =>
					res.status(404).json({
						error: 'An error occurred while attempting to delete the user'
					})
				);
		})
		.catch(err =>
			res.status(404).json({
				error: 'An error occurred while attempting to delete the user profile'
			})
		);
});

module.exports = router;
