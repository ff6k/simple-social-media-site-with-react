import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from './../../actions/authActions';
import TextFieldGroup from './../common/TextFieldGroup';

class Register extends Component {
	state = {
		name: '',
		email: '',
		password: '',
		password2: '',
		errors: {}
	};

	onChange = e =>
		this.setState({
			[e.target.name]: e.target.value
		});

	onSubmit = e => {
		e.preventDefault();
		const newUser = {
			...this.state
		};

		this.props.registerUser(newUser, this.props.history);
	};

	static getDerivedStateFromProps(nextProps, prevProps) {
		if (nextProps.errors) {
			return { errors: nextProps.errors };
		}
		return null;
	}

	componentDidUpdate(prevProps, prevState) {
		const { errors } = this.props;
		if (prevProps.errors !== errors) {
			this.setState({ errors });
		}
	}

	componentDidMount() {
		const { auth, history } = this.props;
		if (auth.isAuthenticated) {
			history.push('/dashboard');
		}
	}

	render() {
		const { errors } = this.state;

		return (
			<div className="register">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Sign Up</h1>
							<p className="lead text-center">
								Create your DevConnector account
							</p>
							<form noValidate onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder="Name"
									name="name"
									autoComplete="name"
									minLength="2"
									maxLength="30"
									value={this.state.name}
									onChange={this.onChange}
									error={errors.name}
								/>
								<TextFieldGroup
									type="email"
									placeholder="Email Address"
									name="email"
									autoComplete="email"
									value={this.state.email}
									onChange={this.onChange}
									error={errors.email}
									info="This site uses Gravatar so if you want a profile image, use
										a Gravatar email"
								/>
								<TextFieldGroup
									type="password"
									placeholder="Password"
									name="password"
									autoComplete="current-password"
									minLength="6"
									maxLength="30"
									value={this.state.password}
									onChange={this.onChange}
									error={errors.password}
								/>
								<TextFieldGroup
									type="password"
									placeholder="Confirm Password"
									name="password2"
									autoComplete="current-password"
									minLength="6"
									maxLength="30"
									value={this.state.password2}
									onChange={this.onChange}
									error={errors.password2}
								/>
								{errors.error && (
									<div style={{ color: 'red' }}>{errors.error}</div>
								)}
								<input type="submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ registerUser }
)(withRouter(Register));
