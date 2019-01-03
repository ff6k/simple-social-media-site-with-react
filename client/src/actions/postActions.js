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
	dispatch(setPostLoading());
	axios
		.get('/api/posts')
		.then(res => dispatch({ payload: res.data, type: GET_POSTS }))
		.catch(err => dispatch({ payload: null, type: GET_POSTS }));
};

// Get Post
export const getPost = id => dispatch => {
	dispatch(setPostLoading());
	axios
		.get(`/api/post/${id}`)
		.then(res => dispatch({ payload: res.data, type: GET_POST }))
		.catch(err => dispatch({ payload: null, type: GET_POST }));
};

// Delete Post
export const deletePost = id => dispatch => {
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
	axios
		.post(`/api/posts/like/${id}`)
		.then(res => dispatch(getPosts()))
		.catch(err => dispatch({ payload: err.response, type: GET_ERRORS }));
};

// Remove Like
export const removeLike = id => dispatch => {
	axios
		.post(`/api/posts/unlike/${id}`)
		.then(res => dispatch(getPosts()))
		.catch(err => dispatch({ payload: err.response, type: GET_ERRORS }));
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
		payload: {},
		type: CLEAR_ERRORS
	};
};
