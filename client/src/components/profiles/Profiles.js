import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profileActions';
import Spinner from '../common/Spinner';

class Profiles extends Component {
	componentDidMount() {
		this.props.getProfiles();
	}

	render() {
		const { loading, profiles } = this.props.profile;
		let profileItems;
		if (profiles === null || loading) {
			profileItems = <Spinner />;
		} else {
			if (profiles.length > 0) {
				profileItems = <h1>PROFILES HERE</h1>;
			} else {
				profileItems = <h4>No profiles found...</h4>;
			}
		}
		return (
			<div className="profiles">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="display-4 text-center">
								<h1>Developer Profiles</h1>
								<p className="lead text-cetner">
									Browse and connect with developers
								</p>
							</div>
							{profileItems}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Profiles.propTypes = {
	getProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile
});

export default connect(
	mapStateToProps,
	{ getProfiles }
)(Profiles);
