const express = require('express');
const router = express.Router();
//const mongoose = require('mongoose');
const passport = require('passport');

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
router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		routeAction.findProfile({ user: req.user.id });
	}
);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => routeAction.findProfile({}, res));

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) =>
	routeAction.findProfile({ handle: req.params.handle }, res)
);

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Public
router.get('/user/:user_id', (req, res) =>
	routeAction.findProfile({ user: req.params.user_id }, res)
);

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
				profileFields.skills = req.body.skills;
			} else {
				const value = req.body[field];
				if (value) profileFields[field] = value;
			}
		});

		profileFields.social = {};

		socialFields.forEach(field => {
			const value = req.body[field];
			if (value) profileFields.social[field] = value;
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

		routeAction
			.addToArray(Profile, { user: req.user.id }, 'experience', req.body, res)
			.catch(err => {
				errors.error = messages.profile.noProfile;
				sender(res, 404, errors);
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

		routeAction
			.addToArray(Profile, { user: req.user.id }, 'education', req.body, res)
			.catch(err => {
				errors.error = messages.profile.noProfile;
				sender(res, 404, errors);
			});
	}
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete(
	'/experience/:exp_id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		routeAction
			.deleteFromArrayByUser(
				Profile,
				{ user: req.user.id },
				'experience',
				req.params.exp_id,
				res
			)
			.catch(err =>
				sender(res, 400, 'Unable to delete experience from user profile.')
			);
	}
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete(
	'/education/:edu_id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		routeAction
			.deleteFromArrayByUser(
				Profile,
				{ user: req.user.id },
				'education',
				req.params.edu_id,
				res
			)
			.catch(err =>
				sender(res, 400, 'Unable to delete education from user profile.')
			);
	}
);

module.exports = router;
