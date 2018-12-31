import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from './../../actions/postActions';

class Posts extends Component {
	render() {
		return (
			<div className="feed">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<PostForm />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Posts.propTypes = {
	addPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	addPost: state.addPost
});

export default connect(
	mapStateToProps,
	{ addPost }
)(Posts);
