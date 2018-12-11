module.exports = {
	messages: {
		server: {
			internal: 'Something went wrong, please try again soon.'
		},
		auth: {
			success: 'You successfully authenticated with the system.',
			error: 'An error occurred while attempting to login.',
			invalidRegistration:
				'The information you specified is invalid for registration.'
		},
		profile: {
			noProfile: 'No profile exists for this user.',
			handleExists: 'That handle already exists.'
		}
	},
	errors: {
		internalServer: {
			message: 'Something went wrong, please try again soon.',
			statusCode: 500
		}
	},
	sendInternalError: res => {
		return res
			.status(errors.internalServer.statusCode)
			.json(errors.internalServer.message);
	},
	sender: (res, statusCode, msg) => {
		return res.status(statusCode).json(msg);
	}
};
