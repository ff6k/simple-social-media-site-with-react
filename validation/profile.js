const Validator = require('validator');
const CoreValidation = require('./core-validation');

const Rules = {
	handle: {
		min: 2,
		max: 40
	}
};

module.exports = ValidateProfileInput = data => {
	let errors = {},
		{
			handle,
			status,
			skills,
			website,
			youtube,
			twitter,
			facebook,
			instagram,
			linkedin
		} = data,
		links = { website, youtube, twitter, facebook, instagram, linkedin };

	setErrorObject = (field, message) => {
		if (!CoreValidation.isEmpty(message)) errors[field] = message;
	};

	setErrorObject(
		'handle',
		CoreValidation.validateLengthRange(
			handle,
			Rules.handle.min,
			Rules.handle.max,
			`Handle must be between ${Rules.handle.min} and ${
				Rules.handle.max
			} characters`
		)
	);

	setErrorObject(
		'handle',
		CoreValidation.validateRequired(handle, 'Handle is required')
	);

	setErrorObject(
		'status',
		CoreValidation.validateRequired(status, 'Status is required')
	);

	setErrorObject(
		'skills',
		CoreValidation.validateRequired(skills, 'Please add at least 1 skill')
	);

	for (let link in links) {
		const Url = links[link];
		if (!CoreValidation.isEmpty(Url)) {
			setErrorObject(link, CoreValidation.validateURL(Url, 'URL is invalid'));
		}
	}

	return {
		errors,
		isValid: CoreValidation.isEmpty(errors)
	};
};
