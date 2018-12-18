import axios from 'axios';
import { GET_ERRORS, CLEAR_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from './../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

// Register User
export const registerUser = (userData, history) => dispatch => {
	axios
		.post('/api/users/register', userData)
		.then(res => history.push('/login'))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const loginUser = userData => dispatch => {
	axios
		.post('/api/users/login', userData)
		.then(res => {
			//save to localStorage
			const { token } = res.data;
			//set token to localStorage
			localStorage.setItem('jwtToken', token);
			//set token to Auth header
			setAuthToken(token);
			const decoded = jwt_decode(token);
			//set current user
			dispatch(setCurrentUser(decoded));
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	};
};

export const clearErrors = () => dispatch => {
	dispatch({
		type: CLEAR_ERRORS,
		payload: {}
	});
};

//log user out
export const logoutUser = () => dispatch => {
	console.log('redirect');
	//remove token from localstorage
	localStorage.removeItem('jwtToken');

	//remove auth header for future requests
	setAuthToken(false);

	//set current user to {} which will set isAuthenticated to false
	dispatch(setCurrentUser({}));

	window.location.href = '/login';
};
