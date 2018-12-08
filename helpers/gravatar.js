const gravatar = require('gravatar');

const defaultURLOptions = {
	format: 'qr',
	s: '200', //size
	r: 'pg', //rating
	d: 'mm' //default
};

module.exports = {
	getGravatarURL: (email, opts) => {
		return gravatar.url(email, opts || defaultURLOptions);
	},
	getGravatarProfileURL: (email, opts) => {
		return gravatar.profile_url(email, opts || {});
	}
};
