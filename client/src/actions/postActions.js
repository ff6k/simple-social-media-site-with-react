import axios from 'axios';
import { ADD_POST, CLEAR_ERRORS, POST_LOADING } from './types';

// Add Post
export const addPost = postData => dispatch => {
	//dispatch(clearErrors());
	axios
		.post('/api/posts', postData)
		.then(res =>
			dispatch({
				payload: res.data,
				type: ADD_POST
			})
		)
		.catch(
			err => {
				throw err;
			}
			// dispatch({
			// 	payload: err.response,
			// 	type: GET_ERRORS
			// })
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
		payload: {},
		type: CLEAR_ERRORS
	};
};
