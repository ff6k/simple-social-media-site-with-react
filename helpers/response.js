module.exports = {
	messages: {
		auth: {
			success: 'You successfully authenticated with the system.',
			error: 'An error occurred while attempting to login.',
			invalidRegistration:
				'The information you specified is invalid for registration'
		}
	},
	sender: (res, statusCode, msg) => {
		return res.status(statusCode).json(msg);
	}
};
