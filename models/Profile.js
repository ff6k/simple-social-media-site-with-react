const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const common = require('../helpers/common');

const ExperienceSchema = new Schema({
		title: {
			type: String,
			required: true,
			trim: true
		},
		company: {
			type: String,
			required: true,
			trim: true
		},
		location: {
			type: String
		},
		from: {
			type: Date,
			required: true
		},
		to: {
			type: Date
		},
		current: {
			type: Boolean,
			default: false
		},
		description: {
			type: String
		}
	}),
	EducationSchema = new Schema({
		school: {
			type: String,
			required: true,
			trim: true
		},
		degree: {
			type: String,
			required: true,
			trim: true
		},
		fieldofstudy: {
			type: String,
			required: true,
			trim: true
		},
		from: {
			type: Date,
			required: true
		},
		to: {
			type: Date
		},
		current: {
			type: Boolean,
			default: false
		},
		description: {
			type: String,
			trim: true
		}
	}),
	ProfileSchema = new Schema({
		user: {
			type: Schema.Types.ObjectId,
			ref: 'users'
		},
		handle: {
			type: String,
			required: true,
			min: 2,
			max: 40,
			trim: true
		},
		company: {
			type: String,
			trim: true
		},
		website: {
			type: String,
			trim: true
		},
		location: {
			type: String,
			trim: true
		},
		status: {
			type: String,
			required: true,
			trim: true
		},
		skills: {
			type: [String],
			set: common.trimArrayItems,
			required: true
		},
		bio: {
			type: String,
			trim: true
		},
		githubprofile: {
			type: String,
			trim: true
		},
		experience: [ExperienceSchema],
		education: [EducationSchema],
		social: {
			youtube: {
				type: String,
				trim: true
			},
			twitter: {
				type: String,
				trim: true
			},
			facebook: {
				type: String,
				trim: true
			},
			linkedin: {
				type: String,
				trim: true
			},
			instagram: {
				type: String,
				trim: true
			}
		},
		date: {
			type: Date,
			default: Date.now
		}
	});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
