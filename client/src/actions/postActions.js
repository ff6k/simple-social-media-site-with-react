import axios from 'axios';
import { ADD_POST, GET_ERRORS } from './types';

//Add Post
export const addPost = postData => dispatch => {
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
				payload: err.response.data,
				type: GET_ERRORS
			})
		);
};
