import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { editProfile, getCurrentProfile } from '../../actions/profileActions';
import InputGroup from '../common/InputGroup';
import ObjectMapper from './../../utils/objectMapper';
import SelectListGroup from './../common/SelectListGroup';
import {
	default as TextAreaFieldGroup,
	default as TextFieldGroup
} from './../common/TextFieldGroup';

class EditProfile extends Component {
	state = {
		bio: '',
		company: '',
		displaySocialInputs: false,
		errors: {},
		facebook: '',
		githubprofile: '',
		handle: '',
		instagram: '',
		linkedin: '',
		location: '',
		options: [
			{ label: '* Select Professional Status', value: '' },
			{ label: 'Developer', value: 'Developer' },
			{ label: 'Junior Developer', value: 'Junior Developer' },
			{ label: 'Senior Developer', value: 'Senior Developer' },
			{ label: 'Full Stack Developer', value: 'Full Stack Developer' },
			{ label: 'Sr. Full Stack Developer', value: 'Sr. Full Stack Developer' },
			{ label: 'Manager', value: 'Manager' },
			{ label: 'Student or Learning', value: 'Student or Learning' },
			{ label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
			{ label: 'Intern', value: 'Intern' },
			{ label: 'Other', value: 'Other' }
		],
		skills: '',
		status: '',
		twitter: '',
		website: '',
		youtube: ''
	};

	fillProfileState = profile => {
		const { skills, social } = profile;
		const skillsToFill = skills ? skills.join() : '';
		const socialsToFill = social ? ObjectMapper(social, this.state) : {};

		const profileToFill = {
			...ObjectMapper(profile, this.state),
			...socialsToFill,
			skills: skillsToFill
		};

		// Added logic for displaySocialInputs
		// We check if social Object from the current profile is whether an empty
		// Object or not. If it's not empty, it has at least one Social Link added.
		const hasSocialLink = Object.keys(socialsToFill).length > 0;

		this.setState({
			...this.state,
			...profileToFill,
			displaySocialInputs: hasSocialLink
		});
	};

	componentDidMount() {
		this.props.getCurrentProfile();
	}

	updateState = (key, value) =>
		this.setState((prevState, props) => (prevState[key] = value));

	onChange = ({ target }) => this.updateState(target.name, target.value);

	onSubmit = e => {
		e.preventDefault();

		const { editProfile, history } = this.props;

		const profileData = {
			...this.state
		};

		editProfile(profileData, history);
	};

	static getDerivedStateFromProps(nextProps, prevProps) {
		if (nextProps.errors) {
			return { errors: nextProps.errors };
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const { errors } = this.props;
		const { profile } = this.props.profile;
		const prevProfile = prevProps.profile.profile;

		if (prevProfile !== profile) {
			this.fillProfileState(profile);
		}

		if (prevProps.errors !== errors) {
			this.setState({ errors });
		}
	}

	render() {
		const { displaySocialInputs, errors } = this.state;

		let socialInputs;

		if (displaySocialInputs) {
			socialInputs = (
				<div>
					<InputGroup
						error={errors.twitter}
						icon="fab fa-twitter"
						name="twitter"
						onChange={this.onChange}
						placeholder="Twitter Profile URL"
						value={this.state.twitter}
					/>
					<InputGroup
						error={errors.facebook}
						icon="fab fa-facebook"
						name="facebook"
						onChange={this.onChange}
						placeholder="Facebook Page URL"
						value={this.state.facebook}
					/>
					<InputGroup
						error={errors.linkedin}
						icon="fab fa-linkedin"
						name="linkedin"
						onChange={this.onChange}
						placeholder="LinkedIn Profile URL"
						value={this.state.linkedin}
					/>
					<InputGroup
						error={errors.youtube}
						icon="fab fa-youtube"
						name="youtube"
						onChange={this.onChange}
						placeholder="YouTube Channel URL"
						value={this.state.youtube}
					/>
					<InputGroup
						error={errors.instagram}
						icon="fab fa-instagram"
						name="instagram"
						onChange={this.onChange}
						placeholder="Instagram Page URL"
						value={this.state.instagram}
					/>
				</div>
			);
		}
		return (
			<div className="create-profile">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link className="btn btn-light" to="/dashboard">
								Go Back
							</Link>
							<h1 className="display-4 text-center">Edit Profile</h1>
							<small className="d-black pb-3">* = Required fields</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									error={errors.handle}
									info="A unique handle for your profile URL. Your full name, company name, nickname"
									name="handle"
									onChange={this.onChange}
									placeholder="* Profile Handle"
									value={this.state.handle}
								/>
								<SelectListGroup
									error={errors.status}
									info="Give us an idea of where you are at in your career"
									name="status"
									onChange={this.onChange}
									options={this.state.options}
									placeholder="Status"
									value={this.state.status}
								/>
								<TextFieldGroup
									error={errors.company}
									info="Could be your own company or one you work for"
									name="company"
									onChange={this.onChange}
									placeholder="Company"
									value={this.state.company}
								/>
								<TextFieldGroup
									error={errors.location}
									info="City or city & state suggested (eg. San Diego, CA)"
									name="location"
									onChange={this.onChange}
									placeholder="Location"
									value={this.state.location}
								/>
								<TextFieldGroup
									error={errors.skills}
									info="Please use comma separated values (eg. HTML, CSS, JavaScript, React.Js, MongoDB)"
									name="skills"
									onChange={this.onChange}
									placeholder="* Skills"
									value={this.state.skills}
								/>
								<TextFieldGroup
									error={errors.githubprofile}
									info="If you want your latest repos and a Github link, include your profile name"
									name="githubprofile"
									onChange={this.onChange}
									placeholder="Github Profile"
									value={this.state.githubprofile}
								/>
								<TextAreaFieldGroup
									error={errors.bio}
									info="Tell us a little about yourself"
									name="bio"
									onChange={this.onChange}
									placeholder="Short Bio"
									value={this.state.bio}
								/>
								<div className="mb-3">
									<button
										className="btn btn-light"
										onClick={e => {
											this.setState(prevState => ({
												displaySocialInputs: !prevState.displaySocialInputs
											}));
										}}
										type="button"
									>
										Add Social Network Links
									</button>
									<span className="text-muted">Optional</span>
									{socialInputs}
									<input
										className="btn btn-info btn-block mt-4"
										type="submit"
										value="Submit"
									/>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

EditProfile.propTypes = {
	editProfile: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	errors: state.errors,
	profile: state.profile
});

export default connect(
	mapStateToProps,
	{ editProfile, getCurrentProfile }
)(withRouter(EditProfile));
