import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser, clearErrors } from '../../actions/authActions';
import TextFieldGroup from './../common/TextFieldGroup';

class Login extends Component {
	state = {
		email: '',
		password: '',
		errors: {}
	};

	onChange = e =>
		this.setState({
			[e.target.name]: e.target.value
		});

	onSubmit = e => {
		e.preventDefault();
		const userData = {
			...this.state
		};
		this.props.loginUser(userData);
	};

	static getDerivedStateFromProps(nextProps, prevProps) {
		if (nextProps.errors) {
			return { errors: nextProps.errors };
		}
		return null;
	}

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
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}

	render() {
		const { errors } = this.state;
		return (
			<div className="login">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Log In</h1>
							<p className="lead text-center">
								Sign in to your DevConnector account
							</p>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									type="email"
									placeholder="Email Address"
									name="email"
									autoComplete="email"
									value={this.state.email}
									onChange={this.onChange}
									error={errors.email}
								/>
								<TextFieldGroup
									type="password"
									placeholder="Password"
									name="password"
									autoComplete="current-password"
									value={this.state.password}
									onChange={this.onChange}
									error={errors.password}
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

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ loginUser, clearErrors }
)(Login);
