import axios from 'axios';
import {
	ADD_POST,
	CLEAR_ERRORS,
	DELETE_POST,
	GET_ERRORS,
	GET_POST,
	GET_POSTS,
	POST_LOADING
} from './types';

// Add Post
export const addPost = postData => dispatch => {
	dispatch(clearErrors());
	axios
		.post('/api/posts', postData)
		.then(res =>
			dispatch({
				payload: res.data,
				type: ADD_POST
			})
		)
		.catch(err =>
			dispatch({
				payload: err.response,
				type: GET_ERRORS
			})
		);
};

// Get Posts
export const getPosts = () => dispatch => {
	dispatch(clearErrors());
	dispatch(setPostLoading());
	axios
		.get('/api/posts')
		.then(res => dispatch({ payload: res.data, type: GET_POSTS }))
		.catch(err => dispatch({ payload: null, type: GET_POSTS }));
};

// Get Post
export const getPost = id => dispatch => {
	dispatch(clearErrors());
	dispatch(setPostLoading());
	axios
		.get(`/api/posts/${id}`)
		.then(res => dispatch({ payload: res.data, type: GET_POST }))
		.catch(err => dispatch({ payload: null, type: GET_POST }));
};

// Delete Post
export const deletePost = id => dispatch => {
	dispatch(clearErrors());
	axios
		.delete(`/api/posts/${id}`)
		.then(res =>
			dispatch({
				payload: id,
				type: DELETE_POST
			})
		)
		.catch(err =>
			dispatch({
				payload: err.response,
				type: GET_ERRORS
			})
		);
};

// Add Like
export const addLike = id => dispatch => {
	dispatch(clearErrors());
	axios
		.post(`/api/posts/like/${id}`)
		.then(res => dispatch(getPosts()))
		.catch(err => dispatch({ payload: err.response, type: GET_ERRORS }));
};

// Remove Like
export const removeLike = id => dispatch => {
	dispatch(clearErrors());
	axios
		.post(`/api/posts/unlike/${id}`)
		.then(res => dispatch(getPosts()))
		.catch(err => dispatch({ payload: err.response, type: GET_ERRORS }));
};

// Add Comment
export const addComment = (postId, commentData) => dispatch => {
	dispatch(clearErrors());
	axios
		.post(`/api/posts/comment/${postId}`, commentData)
		.then(res =>
			dispatch({
				payload: res.data,
				type: GET_POST
			})
		)
		.catch(err =>
			dispatch({
				payload: err.response,
				type: GET_ERRORS
			})
		);
};

// Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
	dispatch(clearErrors());
	axios
		.delete(`/api/posts/${postId}/comment/${commentId}`)
		.then(res =>
			dispatch({
				payload: res.data,
				type: GET_POST
			})
		)
		.catch(err =>
			dispatch({
				payload: err.response,
				type: GET_ERRORS
			})
		);
};

// Set loading state
export const setPostLoading = () => {
	return {
		type: POST_LOADING
	};
};

// Clear errors
export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS
	};
};
