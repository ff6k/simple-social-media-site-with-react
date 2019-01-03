import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/postActions';

class CommentItem extends Component {
	onDeleteClick(postId, commentId) {
		this.props.deleteComment(postId, commentId);
	}

	render() {
		const { auth, comment, postId } = this.props;

		return (
			<div className="card card-body mb-3">
				<div className="row">
					<div className="col-md-2">
						<a href="profile.html">
							<img
								alt=""
								className="rounded-circle d-none d-md-block"
								src={comment.avatar}
							/>
						</a>
						<br />
						<p className="text-center">{comment.name}</p>
					</div>
					<div className="col-md-10">
						<p className="lead">{comment.text}</p>
						{comment.user === auth.user.id ? (
							<button
								className="btn btn-danger mr-1"
								onClick={() => this.onDeleteClick(postId, comment._id)}
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

CommentItem.propTypes = {
	auth: PropTypes.object.isRequired,
	comment: PropTypes.object.isRequired,
	deleteComment: PropTypes.func.isRequired,
	postId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ deleteComment }
)(CommentItem);
