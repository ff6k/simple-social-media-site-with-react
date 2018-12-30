import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfileByHandle } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import CoreValidation from './../../validation/core-validation';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import ProfileHeader from './ProfileHeader';

class Profile extends Component {
	componentDidMount() {
		const { handle } = this.props.match.params;
		handle && this.props.getProfileByHandle(handle);
	}

	componentDidUpdate() {
		if (
			CoreValidation.isEmpty(this.props.profile) ||
			(CoreValidation.isEmpty(this.props.profile.profile) &&
				!this.props.profile.loading)
		) {
			this.props.history.push('/not-found');
		}
	}

	render() {
		const { loading } = this.props;
		let { profile } = this.props.profile;

		let profileContent;

		if (
			CoreValidation.isEmpty(profile) ||
			CoreValidation.isEmpty(profile[0]) ||
			loading
		) {
			profileContent = <Spinner />;
		} else {
			profile = profile[0];

			profileContent = (
				<div>
					<div className="row">
						<div className="col-md-6">
							<Link className="btn btn-light mb-3 float-left" to="/profiles">
								Back To Profiles
							</Link>
						</div>
						<div className="col-md-6" />
					</div>
					<ProfileHeader profile={profile} />
					<ProfileAbout profile={profile} />
					<ProfileCreds
						education={profile.education}
						experience={profile.experience}
					/>
					{profile.githubprofile ? (
						<ProfileGithub username={profile.githubprofile} />
					) : null}
				</div>
			);
		}

		return (
			<div className="profile">
				<div className="container">
					<div className="row">
						<div className="col-md-12">{profileContent}</div>
					</div>
				</div>
			</div>
		);
	}
}

Profile.propTypes = {
	getProfileByHandle: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile
});

export default connect(
	mapStateToProps,
	{ getProfileByHandle }
)(Profile);
