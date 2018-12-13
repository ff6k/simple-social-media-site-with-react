const Validator = require('validator');
const CoreValidation = require('./core-validation');

const Rules = {
	text: {
		min: 10,
		max: 300
	}
};

module.exports = ValidatePostInput = data => {
	let errors = {};
	const { text } = data;

	setErrorObject = (field, message) => {
		if (!CoreValidation.isEmpty(message)) errors[field] = message;
	};

	setErrorObject(
		'text',
		CoreValidation.validateLengthRange(
			text,
			Rules.text.min,
			Rules.text.max,
			`Post must be between ${Rules.text.min} and ${Rules.text.max} characters`
		)
	);

	setErrorObject(
		'text',
		CoreValidation.validateRequired(text, 'Post is required')
	);

	return {
		errors,
		isValid: CoreValidation.isEmpty(errors)
	};
};
