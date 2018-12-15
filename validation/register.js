const Validator = require('validator');
const CoreValidation = require('./core-validation');

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

	const { name, email, password, password2 } = data;

	setErrorObject = (field, message) => {
		if (!CoreValidation.isEmpty(message)) errors[field] = message;
	};

	// Validate Name
	setErrorObject(
		'name',
		CoreValidation.validateLengthRange(
			name,
			Rules.name.min,
			Rules.name.max,
			`Name must be between ${Rules.name.min} and ${Rules.name.max} characters`
		)
	);

	setErrorObject(
		'name',
		CoreValidation.validateRequired(name, 'Name is required')
	);

	setErrorObject(
		'email',
		CoreValidation.validateEmail(email, 'Email is invalid')
	);

	// Validate Email
	setErrorObject(
		'email',
		CoreValidation.validateRequired(email, 'Email is required')
	);

	// Validate Password
	setErrorObject(
		'password',
		CoreValidation.validateRequired(password, 'Password is required')
	);

	setErrorObject(
		'password',
		CoreValidation.validateLengthRange(
			password,
			Rules.password.min,
			Rules.password.max,
			`Password must be at least ${Rules.password.min} characters`
		)
	);

	// Validate Password Confirmation
	setErrorObject(
		'password2',
		CoreValidation.validateRequired(
			password2,
			'Confirm Password field is required'
		)
	);

	setErrorObject(
		'password2',
		CoreValidation.validateValueMatch(
			password,
			password2,
			'Passwords must match'
		)
	);

	return {
		errors,
		isValid: CoreValidation.isEmpty(errors)
	};
};
