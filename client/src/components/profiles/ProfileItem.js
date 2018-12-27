import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CoreValidation from './../../validation/core-validation';

class ProfileItem extends Component {
	render() {
		const { profile } = this.props;
		return (
			<div className="card card-body bg-light mb-3">
				<div className="row">
					<div className="col-2">
						<img alt="" className="rounded-circle" src={profile.user.avatar} />
					</div>
					<div className="col-lg-6 col-md-4 col-8">
						<h3>{profile.user.namem}</h3>
						<p>
							{profile.status}{' '}
							{CoreValidation.isEmpty(profile.company) ? null : (
								<span>at {profile.company}</span>
							)}
						</p>
						<p>
							{CoreValidation.isEmpty(profile.location) ? null : (
								<span>{profile.location}</span>
							)}
						</p>
						<Link className="btn btn-info" to={`/profile/${profile.handle}`}>
							View Profile
						</Link>
					</div>
					<div className="col-md-4 d-none d-md-block">
						<h4>Skill set</h4>
						<ul className="list-group">
							{profile.skills.slice(0, 4).map((skill, index) => (
								<li className="list-group-item" key={index}>
									<i className="fa fa-check pr-1" />
									{skill}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

ProfileItem.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileItem;
