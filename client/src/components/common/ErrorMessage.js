import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = message => {
	return message && <div style={{ color: 'red' }}>{message}</div>;
};

ErrorMessage.propTypes = {
	message: PropTypes.string
};

export default ErrorMessage;
