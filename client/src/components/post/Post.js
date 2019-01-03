import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import PostItem from '../posts/PostItem';
import { getPost } from './../../actions/postActions';
import CommentForm from './CommentForm';

class Post extends Component {
	componentDidMount() {
		console.log('this.props.match.params.id: ', this.props.match.params.id);
		this.props.getPost(this.props.match.params.id);
	}

	render() {
		const { loading, post } = this.props.post;
		let postContent;
		if (post === null || loading || Object.keys(post).length === 0) {
			postContent = <Spinner />;
		} else {
			postContent = (
				<div>
					<PostItem post={post} showActions={false} />
					<CommentForm postId={post._id} />
				</div>
			);
		}

		return (
			<div className="post">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<Link className="btn btn-light mb-3" to="/feed">
								Back to Feed
							</Link>
							{postContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
	post: state.post
});

export default connect(
	mapStateToProps,
	{ getPost }
)(Post);
