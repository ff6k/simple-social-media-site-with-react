import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addLike, deletePost, removeLike } from './../../actions/postActions';

class PostItem extends Component {
	findUserLike = likes => {
		const { user } = this.props.auth;
		return (
			(likes && likes.filter(like => like.user === user.id).length > 0) || false
		);
	};

	onDeleteClick(id) {
		this.props.deletePost(id);
	}

	onLikeClick(id, likes) {
		this.findUserLike(likes)
			? this.props.removeLike(id)
			: this.props.addLike(id);
	}

	render() {
		const { auth, post } = this.props;
		let likeButton;

		if (post.user !== auth.user.id) {
			likeButton = (
				<button
					className="btn btn-light mr-1"
					onClick={() => this.onLikeClick(post._id, post.likes)}
					type="button"
				>
					<i
						className={classnames('fas fa-thumbs-up', {
							'text-info': this.findUserLike(post.likes)
						})}
					/>
					<span className="badge badge-light">{post.likes.length}</span>
				</button>
			);
		} else {
			likeButton = (
				<span className="mr-1">
					<i className="text-secondary fas fa-thumbs-up" />
					<span className="badge badge-light">{post.likes.length}</span>
				</span>
			);
		}

		return (
			<div className="card card-body mb-3">
				<div className="row">
					<div className="col-md-2">
						<a href="profile.html">
							<img
								alt=""
								className="rounded-circle d-none d-md-block"
								src={post.avatar}
							/>
						</a>
						<br />
						<p className="text-center">{post.name}</p>
					</div>
					<div className="col-md-10">
						<p className="lead">{post.text}</p>
						{likeButton}
						{/* {unLikeButton} */}
						<Link className="btn btn-info mr-1" to={`/post/${post._id}`}>
							Comments
						</Link>
						{post.user === auth.user.id ? (
							<button
								className="btn btn-danger mr-1"
								onClick={() => this.onDeleteClick(post._id)}
								type="button"
							>
								<i className="fas fa-times" />
							</button>
						) : null}
					</div>
				</div>
			</div>
		);
	}
}

PostItem.propTypes = {
	addLike: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	deletePost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
	removeLike: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ addLike, deletePost, removeLike }
)(PostItem);
