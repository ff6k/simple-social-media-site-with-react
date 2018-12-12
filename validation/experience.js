const Validator = require('validator');
const CoreValidation = require('./core-validation');

module.exports = ValidateExperienceInput = data => {
	let errors = {};
	const { title, company, from } = data;

	setErrorObject = (field, message) => {
		if (!CoreValidation.isEmpty(message)) errors[field] = message;
	};

	setErrorObject(
		'title',
		CoreValidation.validateRequired(title, 'Title is required')
	);
	setErrorObject(
		'company',
		CoreValidation.validateRequired(company, 'Company is required')
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
