import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CoreValidation from './../../validation/core-validation';

class ProfileAbout extends Component {
	render() {
		const { profile } = this.props;

		// Get first name
		const firstName = profile.user.name.trim().split(' ')[0];

		// Skill List
		const skills = profile.skills.map((skill, index) => (
			<div className="p-3" key={index}>
				<i className="fa fa-check" /> {skill}
			</div>
		));

		return (
			<div className="row">
				<div className="col-md-12">
					<div className="card card-body bg-light mb-3">
						<h3 className="text-center text-info">{firstName}'s Bio</h3>
						<p className="lead">
							{CoreValidation.isEmpty(profile.bio) ? (
								<span>{firstName} does not have a bio</span>
							) : (
								<span>{profile.bio}</span>
							)}
						</p>
						<hr />
						<h3 className="text-center text-info">Skill Set</h3>
						<div className="row">
							<div className="d-flex flex-wrap justify-content-center align-items-center">
								{skills}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

ProfileAbout.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileAbout;
