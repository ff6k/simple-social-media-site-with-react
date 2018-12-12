const Validator = require('validator');
const CoreValidation = require('./core-validation');

module.exports = ValidateLoginInput = data => {
	let errors = {};
	const { email, password } = data;

	setErrorObject = (field, message) => {
		if (!CoreValidation.isEmpty(message)) errors[field] = message;
	};

	// Validate Email
	setErrorObject(
		'email',
		CoreValidation.validateEmail(email, 'Email is invalid')
	);

	setErrorObject(
		'email',
		CoreValidation.validateRequired(email, 'Email is required')
	);

	// Validate Password
	setErrorObject(
		'password',
		CoreValidation.validateRequired(password, 'Password is required')
	);

	return {
		errors,
		isValid: CoreValidation.isEmpty(errors)
	};
};
