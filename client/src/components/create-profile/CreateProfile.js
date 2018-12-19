import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from './../common/TextFieldGroup';
import TextAreaFieldGroup from './../common/TextFieldGroup';
import SelectListGroup from './../common/SelectListGroup';
import InputGroup from '../common/InputGroup';

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

	onChange = e =>
		this.setState({
			[e.target.name]: e.target.value
		});
	/* 
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      ...this.state
    };
    this.props.loginUser(userData);
  }; */
	/* 
  static getDerivedStateFromProps(nextProps, prevProps) {
    if (nextProps.errors) {
      return { errors: nextProps.errors };
    }
    return null;
  } */
	/* 
  componentDidUpdate(prevProps, prevState) {
    const { errors, history } = this.props;
    const { isAuthenticated } = this.props.auth;

    if (prevProps.errors !== errors) {
      this.setState({ errors });
    }
    if (isAuthenticated) {
      this.setState({ isAuthenticated });
      this.props.clearErrors();
      history.push('/dashboard');
    }
  } */
	/* 
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  } */

	render() {
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

export default connect(mapStateToProps)(CreateProfile);
