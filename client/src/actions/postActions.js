import axios from 'axios';
import {
	ADD_POST,
	CLEAR_ERRORS,
	GET_ERRORS,
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
