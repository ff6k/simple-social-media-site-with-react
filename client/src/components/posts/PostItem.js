import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import classnames from 'classnames';
import { Link } from 'react-router-dom';

class PostItem extends Component {
	onDeleteClick(id) {
		console.log(id);
	}

	render() {
		const { auth, post } = this.props;

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
						<button className="btn btn-light mr-1" type="button">
							<i className="text-info fas fa-thumbs-up" />
							<span className="badge badge-light">{post.likes.length}</span>
						</button>
						<button className="btn btn-light mr-1" type="button">
							<i className="text-secondary fas fa-thumbs-down" />
						</button>
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
	auth: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(PostItem);
