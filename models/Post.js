const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
		user: {
			type: Schema.Types.ObjectId,
			ref: 'users'
		},
		text: {
			type: String,
			required: true
		},
		name: {
			type: String
		},
		avatar: {
			type: String
		},
		date: {
			type: Date,
			default: Date.now
		}
	}),
	PostSchema = new Schema({
		user: {
			type: Schema.Types.ObjectId,
			ref: 'users'
		},
		text: {
			type: String,
			required: true
		},
		name: {
			type: String
		},
		avatar: {
			type: String
		},
		likes: [
			{
				user: {
					type: Schema.Types.ObjectId,
					ref: 'users'
				}
			}
		],
		comments: [CommentSchema],
		date: {
			type: Date,
			default: Date.now
		}
	});

module.exports = Post = mongoose.model('post', PostSchema);
