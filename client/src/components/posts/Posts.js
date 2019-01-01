import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { getPosts } from './../../actions/postActions';
import PostFeed from './PostFeed';
import PostForm from './PostForm';

class Posts extends Component {
	componentDidMount() {
		this.props.getPosts();
	}
	render() {
		const { loading, posts } = this.props.post;
		let postContent;

		if (posts === null || loading) {
			postContent = <Spinner />;
		} else {
			postContent = <PostFeed posts={posts} />;
		}

		return (
			<div className="feed">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<PostForm />
							{postContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Posts.propTypes = {
	getPosts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	post: state.post
});

export default connect(
	mapStateToProps,
	{ getPosts }
)(Posts);
