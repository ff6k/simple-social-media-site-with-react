import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
	name,
	placeholder,
	value,
	error,
	info,
	type,
	onChange,
	disabled,
	autoComplete,
	minLength,
	maxLength
}) => {
	return (
		<div className="form-group">
			<input
				type={type}
				className={classnames('form-control form-control-lg', {
					'is-invalid': error
				})}
				placeholder={placeholder}
				name={name}
				autoComplete={autoComplete}
				value={value}
				onChange={onChange}
				disabled={disabled}
				minLength={minLength}
				maxLength={maxLength}
			/>
			{info && <small className="form-text text-muted">{info}</small>}
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

TextFieldGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	info: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.string,
	autoComplete: PropTypes.string,
	minLength: PropTypes.string,
	maxLength: PropTypes.string
};

TextFieldGroup.defaultProps = {
	type: 'text'
};

export default TextFieldGroup;
