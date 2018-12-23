import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextAreaFieldGroup = ({
	name,
	placeholder,
	value,
	error,
	onChange,
	autoComplete,
	minLength,
	maxLength
}) => {
	return (
		<div className="input-group mb-3">
			<textarea
				className={classnames('form-control form-control-lg', {
					'is-invalid': error
				})}
				placeholder={placeholder}
				name={name}
				autoComplete={autoComplete}
				value={value}
				onChange={onChange}
				minLength={minLength}
				maxLength={maxLength}
			/>
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

TextAreaFieldGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	info: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	autoComplete: PropTypes.string,
	minLength: PropTypes.string,
	maxLength: PropTypes.string
};

export default TextAreaFieldGroup;
