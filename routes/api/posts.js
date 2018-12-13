const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const requireLogin = passport.authenticate('jwt', { session: false });

const { messages, sender } = require('../../helpers/response');

// Profile/Post model
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');

// Validation
const ValidatePostInput = require('../../validation/post');

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get('/', (req, res) => {
	Post.find()
		.sort({ date: -1 })
		.then(posts => res.json(posts))
		.catch(err => sender(res, 404, { posts: 'No posts found' }));
});

// @route   GET api/post/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
	Post.findById(req.params.id)
		.then(post => {
			if (!post) {
				return sender(res, 404, {
					posts: 'Post not found for that ID',
					postId: req.params.id
				});
			}

			res.json(post);
		})
		.catch(err =>
			sender(res, 404, {
				posts: 'Post not found for that ID',
				postId: req.params.id
			})
		);
});

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post('/', requireLogin, (req, res) => {
	const { errors, isValid } = ValidatePostInput(req.body);

	if (!isValid) {
		return sender(res, 400, errors);
	}

	const newPost = new Post({
		text: req.body.text,
		name: req.user.name,
		avatar: req.user.avatar,
		user: req.user.id
	});

	newPost.save().then(post => res.json(post));
});

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', requireLogin, (req, res) => {
	Post.findById(req.params.id)
		.then(post => {
			//Check for post owner
			if (post.user.toString() !== req.user.id) {
				return sender(res, 401, { error: 'User not authorized' });
			}

			post
				.remove()
				.then(() => {
					res.json({
						message: 'Successfully deleted post.',
						name: req.user.name,
						userId: req.user.id,
						postId: post.id
					});
				})
				.catch(err => {
					sender(res, 404, {
						message: 'The post was not found to delete.',
						name: req.user.name,
						userId: req.user.id,
						postId: req.params.id
					});
				});
		})
		.catch(err =>
			sender(res, 404, {
				message: 'The post was not found to delete.',
				name: req.user.name,
				userId: req.user.id,
				postId: req.params.id
			})
		);
});

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post('/like/:id', requireLogin, (req, res) => {
	Profile.findOne({ user: req.user.id }).then(profile => {
		Post.findById(req.params.id)
			.then(post => {
				if (
					post.likes.filter(like => like.user.toString() === req.user.id)
						.length > 0
				) {
					return sender(res, 400, { error: 'User already liked this post' });
				}

				post.likes.unshift({ user: req.user.id });
				post.save().then(post => res.json(post));
			})
			.catch(err =>
				sender(res, 404, {
					message: 'The post was not found to like.',
					name: req.user.name,
					userId: req.user.id,
					postId: req.params.id,
					error: err
				})
			);
	});
});

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post('/unlike/:id', requireLogin, (req, res) => {
	Profile.findOne({ user: req.user.id }).then(profile => {
		Post.findById(req.params.id)
			.then(post => {
				if (
					post.likes.filter(like => like.user.toString() === req.user.id)
						.length === 0
				) {
					return sender(res, 400, {
						message: 'You have not yet liked this post'
					});
				}

				//Get remove index
				const removeIndex = post.likes
					.map(item => item.user.toString())
					.indexOf(req.user.id);

				//Splice out of array
				post.likes.splice(removeIndex, 1);
				post.save().then(post => res.json(post));
			})
			.catch(err =>
				sender(res, 404, {
					message: 'The post was not found to like.',
					name: req.user.name,
					userId: req.user.id,
					postId: req.params.id,
					error: err
				})
			);
	});
});

module.exports = router;
