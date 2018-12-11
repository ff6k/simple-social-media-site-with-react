const Validator = require('validator');
const CoreValidation = require('./core-validation');

module.exports = ValidateLoginInput = data => {
	let errors = {};

	setErrorObject = (field, message) => {
		if (!CoreValidation.isEmpty(message)) errors[field] = message;
	};

	// Validate Email
	setErrorObject(
		'email',
		CoreValidation.validateEmail(data.email, 'Email is invalid')
	);

	setErrorObject(
		'email',
		CoreValidation.validateRequired(data.email, 'Email is required')
	);

	// Validate Password
	setErrorObject(
		'password',
		CoreValidation.validateRequired(data.password, 'Password is required')
	);

	return {
		errors,
		isValid: CoreValidation.isEmpty(errors)
	};
};
