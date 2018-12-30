import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from './../utils/setAuthToken';
import { CLEAR_ERRORS, GET_ERRORS, SET_CURRENT_USER } from './types';

// Register User
export const registerUser = (userData, history) => dispatch => {
	axios
		.post('/api/users/register', userData)
		.then(res => history.push('/login'))
		.catch(err =>
			dispatch({
				payload: err.response.data,
				type: GET_ERRORS
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
				payload: err.response.data,
				type: GET_ERRORS
			})
		);
};

export const setCurrentUser = decoded => {
	return {
		payload: decoded,
		type: SET_CURRENT_USER
	};
};

export const clearErrors = () => dispatch => {
	dispatch({
		payload: {},
		type: CLEAR_ERRORS
	});
};

//log user out
export const logoutUser = () => dispatch => {
	//remove token from localstorage
	localStorage.removeItem('jwtToken');

	//remove auth header for future requests
	setAuthToken(false);

	//set current user to {} which will set isAuthenticated to false
	dispatch(setCurrentUser({}));
};
