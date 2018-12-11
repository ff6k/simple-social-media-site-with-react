const Validator = require('validator');
const CoreValidation = require('./core-validation');

const Rules = {};

module.exports = ValidateProfileInput = data => {
	let errors = {};

	setErrorObject = (field, message) => {
		if (!CoreValidation.isEmpty(message)) errors[field] = message;
	};

	return {
		errors,
		isValid: CoreValidation.isEmpty(errors)
	};
};
