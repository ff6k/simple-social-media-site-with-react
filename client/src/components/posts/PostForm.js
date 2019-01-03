import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../actions/postActions';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

class PostForm extends Component {
	state = {
		errors: {},
		text: ''
	};

	updateState = (key, value) =>
		this.setState((prevState, props) => (prevState[key] = value));

	onChange = ({ target }) => this.updateState(target.name, target.value);

	onSubmit = e => {
		e.preventDefault();

		const { text } = this.state;
		const { avatar, name } = this.props.auth.user;

		const newPost = {
			avatar,
			name,
			text
		};

		this.props.addPost(newPost);
		this.updateState('text', '');
	};

	componentDidUpdate(prevProps, prevState) {
		const { errors } = this.props;

		if (prevProps.errors !== errors) {
			this.setState({ errors });
		}
	}

	render() {
		const { errors, text } = this.state;

		return (
			<div className="post-form mb-3">
				<div className="card card-info">
					<div className="card-header bg-info text-white">Say Somthing...</div>
					<div className="card-body">
						<form onSubmit={this.onSubmit}>
							<div className="form-group">
								<TextAreaFieldGroup
									error={errors.text}
									name="text"
									onChange={this.onChange}
									placeholder="Create a post"
									value={text}
								/>
							</div>
							<button className="btn btn-dark" type="submit">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

PostForm.propTypes = {
	addPost: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ addPost }
)(PostForm);
