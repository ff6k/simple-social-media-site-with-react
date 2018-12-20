import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from './../common/TextFieldGroup';
import TextAreaFieldGroup from './../common/TextFieldGroup';
import SelectListGroup from './../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import { createProfile } from '../../actions/profileActions';

class CreateProfile extends Component {
	state = {
		displaySocialInputs: false,
		handle: '',
		company: '',
		website: '',
		location: '',
		status: '',
		skills: '',
		githubprofile: '',
		bio: '',
		twitter: '',
		facebook: '',
		linkedin: '',
		youtube: '',
		instagram: '',
		errors: {}
	};

	updateState = (key, value) =>
		this.setState((prevState, props) => (prevState[key] = value));

	onChange = e => this.updateState([e.target.name], e.target.value);

	onSubmit = e => {
		e.preventDefault();

		const profileData = {
			...this.state
		};

		this.props.createProfile(profileData, this.props.history);
	};

	static getDerivedStateFromProps(nextProps, prevProps) {
		if (nextProps.errors) {
			return { errors: nextProps.errors };
		}
		return null;
	}

	componentDidUpdate(prevProps, prevState) {
		const { errors, history } = this.props;

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
						placeholder="Twitter Profile URL"
						name="twitter"
						icon="fab fa-twitter"
						value={this.state.twitter}
						onChange={this.onChange}
						error={errors.twitter}
					/>
					<InputGroup
						placeholder="Facebook Page URL"
						name="facebook"
						icon="fab fa-facebook"
						value={this.state.facebook}
						onChange={this.onChange}
						error={errors.facebook}
					/>
					<InputGroup
						placeholder="LinkedIn Profile URL"
						name="linkedin"
						icon="fab fa-linkedin"
						value={this.state.linkedin}
						onChange={this.onChange}
						error={errors.linkedin}
					/>
					<InputGroup
						placeholder="YouTube Channel URL"
						name="youtube"
						icon="fab fa-youtube"
						value={this.state.youtube}
						onChange={this.onChange}
						error={errors.youtube}
					/>
					<InputGroup
						placeholder="Instagram Page URL"
						name="instagram"
						icon="fab fa-instagram"
						value={this.state.instagram}
						onChange={this.onChange}
						error={errors.instagram}
					/>
				</div>
			);
		}

		//select options for status
		const options = [
			{ label: '* Select Professional Status', value: 0 },
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
		];
		return (
			<div className="create-profile">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Create Your Profile</h1>
							<p className="lead text-center">
								Let's get some information to make your profile stand out.
							</p>
							<small className="d-black pb-3">* = Required fields</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder="* Profile Handle"
									name="handle"
									value={this.state.handle}
									onChange={this.onChange}
									error={errors.handle}
									info="A unique handle for your profile URL. Your full name, company name, nickname"
								/>
								<SelectListGroup
									placeholder="Status"
									name="status"
									value={this.state.status}
									onChange={this.onChange}
									options={options}
									error={errors.status}
									info="Give us an idea of where you are at in your career"
								/>
								<TextFieldGroup
									placeholder="Company"
									name="company"
									value={this.state.company}
									onChange={this.onChange}
									error={errors.company}
									info="Could be your own company or one you work for"
								/>
								<TextFieldGroup
									placeholder="Location"
									name="location"
									value={this.state.location}
									onChange={this.onChange}
									error={errors.location}
									info="City or city & state suggested (eg. San Diego, CA)"
								/>
								<TextFieldGroup
									placeholder="* Skills"
									name="skills"
									value={this.state.skills}
									onChange={this.onChange}
									error={errors.skills}
									info="Please use comma separated values (eg. HTML, CSS, JavaScript, React.Js, MongoDB)"
								/>
								<TextFieldGroup
									placeholder="Github Profile"
									name="githubprofile"
									value={this.state.githubprofile}
									onChange={this.onChange}
									error={errors.githubprofile}
									info="If you want your latest repos and a Github link, include your profile name"
								/>
								<TextAreaFieldGroup
									placeholder="Short Bio"
									name="bio"
									value={this.state.bio}
									onChange={this.onChange}
									error={errors.bio}
									info="Tell us a little about yourself"
								/>
								<div className="mb-3">
									<button
										type="button"
										onClick={e => {
											this.setState(prevState => ({
												displaySocialInputs: !prevState.displaySocialInputs
											}));
										}}
										className="btn btn-light"
									>
										Add Social Network Links
									</button>
									<span className="text-muted">Optional</span>
									{socialInputs}
									<input
										type="submit"
										value="Submit"
										className="btn btn-info btn-block mt-4"
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

CreateProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ createProfile }
)(withRouter(CreateProfile));
