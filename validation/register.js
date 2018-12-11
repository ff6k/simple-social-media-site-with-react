const Validator = require('validator');
const CoreValidation = require('./core-validation');
//const isEmpty = require('./is-empty');

const Rules = {
	name: {
		min: 2,
		max: 30
	},
	password: {
		min: 6,
		max: 30
	}
};

module.exports = ValidateRegisterInput = data => {
	let errors = {};

	setErrorObject = (field, message) => {
		if (!CoreValidation.isEmpty(message)) errors[field] = message;
	};

	// Validate Name
	setErrorObject(
		'name',
		CoreValidation.validateLengthRange(
			data.name,
			Rules.name.min,
			Rules.name.max,
			`Name must be between ${Rules.name.min} and ${Rules.name.max} characters`
		)
	);

	setErrorObject(
		'name',
		CoreValidation.validateRequired(data.name, 'Name is required')
	);

	// Validate Email
	setErrorObject(
		'email',
		CoreValidation.validateRequired(data.email, 'Email is required')
	);

	setErrorObject(
		'email',
		CoreValidation.validateEmail(data.email, 'Email is invalid')
	);

	// Validate Password
	setErrorObject(
		'password',
		CoreValidation.validateRequired(data.password, 'Password is required')
	);

	setErrorObject(
		'password',
		CoreValidation.validateLengthRange(
			data.password,
			Rules.password.min,
			Rules.password.max,
			`Password must be at least ${Rules.password.min} characters`
		)
	);

	// Validate Password Confirmation
	setErrorObject(
		'password2',
		CoreValidation.validateRequired(
			data.password2,
			'Confirm Password field is required'
		)
	);

	setErrorObject(
		'password2',
		CoreValidation.validateValueMatch(
			data.password,
			data.password2,
			'Passwords must match'
		)
	);

	return {
		errors,
		isValid: CoreValidation.isEmpty(errors)
	};
};
