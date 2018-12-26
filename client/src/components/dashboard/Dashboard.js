import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import {
	deleteAccount,
	getCurrentProfile
} from './../../actions/profileActions';
import Experience from './Experience';
import ProfileActions from './ProfileActions';

class Dashboard extends Component {
	componentDidMount() {
		this.props.getCurrentProfile();
	}

	onDeleteClick = e => {
		this.props.deleteAccount();
	};

	render() {
		const { user } = this.props.auth;
		const { loading, profile } = this.props.profile;

		let dashboardContent;

		if (profile === null || loading) {
			dashboardContent = <Spinner />;
		} else {
			//check if logged in user has profile
			if (Object.keys(profile).length > 0) {
				dashboardContent = (
					<div>
						<p className="lead text-muted">
							Welcome,{' '}
							<Link to={`/profile/${profile.handle}`}>{user.name}</Link>!
						</p>
						<ProfileActions />
						<Experience experience={profile.experience} />
						{/* TODO: exp and edu */}
						<div style={{ marginBottom: '60px' }} />
						<button className="btn btn-danger" onClick={this.onDeleteClick}>
							Delete My Account
						</button>
					</div>
				);
			} else {
				//user is logged in, but does not have profile
				dashboardContent = (
					<div>
						<p className="lead text-muted">Welcome, {user.name}!</p>
						<p>You have not yet setup a profile, please add some info.</p>
						<Link className="btn btn-lg btn-info" to="/create-profile">
							Create Profile
						</Link>
					</div>
				);
			}
		}

		return (
			<div className="dashboard">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="display-4">Dashboard</h1>
							{dashboardContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
	auth: PropTypes.object.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(
	mapStateToProps,
	{ deleteAccount, getCurrentProfile }
)(Dashboard);
