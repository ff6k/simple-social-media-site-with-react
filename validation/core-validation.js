const Validator = require('validator');

module.exports = CoreValidation = {
	isEmpty: value =>
		value === undefined ||
		value === null ||
		(typeof value === 'object' && Object.keys(value).length === 0) ||
		(typeof value === 'string' && value.trim().length === 0),
	normalizeValue: value =>
		value != CoreValidation.isEmpty(value) ? value : '',
	validateRequired: (value, message) => {
		value = CoreValidation.normalizeValue(value);
		return Validator.isEmpty(value) ? message : '';
	},
	validateLengthRange: (value, min, max, message) => {
		value = CoreValidation.normalizeValue(value);
		return !Validator.isLength(value, { min, max }) ? message : '';
	},
	validateValueMatch: (value1, value2, message) => {
		value1 = CoreValidation.normalizeValue(value1);
		value2 = CoreValidation.normalizeValue(value2);
		return !Validator.equals(value1, value2) ? message : '';
	},
	validateEmail: (value, message) => {
		value = CoreValidation.normalizeValue(value);
		return !Validator.isEmail(value) ? message : '';
	}
};
