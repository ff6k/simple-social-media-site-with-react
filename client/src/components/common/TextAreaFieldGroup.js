import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const TextAreaFieldGroup = ({
	autoComplete,
	error,
	maxLength,
	minLength,
	name,
	onChange,
	placeholder,
	value
}) => {
	return (
		<div className="input-group mb-3">
			<textarea
				autoComplete={autoComplete}
				className={classnames('form-control form-control-lg', {
					'is-invalid': error
				})}
				maxLength={maxLength}
				minLength={minLength}
				name={name}
				onChange={onChange}
				placeholder={placeholder}
				value={value}
			/>
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

TextAreaFieldGroup.propTypes = {
	autoComplete: PropTypes.string,
	error: PropTypes.string,
	info: PropTypes.string,
	maxLength: PropTypes.string,
	minLength: PropTypes.string,
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired
};

export default TextAreaFieldGroup;
