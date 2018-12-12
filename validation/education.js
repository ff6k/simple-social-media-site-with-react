const Validator = require('validator');
const CoreValidation = require('./core-validation');

module.exports = ValidateEducationInput = data => {
	let errors = {};
	const { school, degree, fieldofstudy, from } = data;

	setErrorObject = (field, message) => {
		if (!CoreValidation.isEmpty(message)) errors[field] = message;
	};

	setErrorObject(
		'school',
		CoreValidation.validateRequired(school, 'School is required')
	);

	setErrorObject(
		'degree',
		CoreValidation.validateRequired(degree, 'Degree is required')
	);

	setErrorObject(
		'fieldofstudy',
		CoreValidation.validateRequired(fieldofstudy, 'Field of Study is required')
	);

	setErrorObject(
		'from',
		CoreValidation.validateRequired(from, 'From is required')
	);

	return {
		errors,
		isValid: CoreValidation.isEmpty(errors)
	};
};
