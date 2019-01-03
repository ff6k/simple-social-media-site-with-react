import axios from 'axios';
import {
	CLEAR_CURRENT_PROFILE,
	CLEAR_ERRORS,
	GET_ERRORS,
	GET_PROFILE,
	GET_PROFILES,
	PROFILE_LOADING,
	SET_CURRENT_USER
} from './types';

//get current profile
export const getCurrentProfile = () => dispatch => {
	dispatch(clearErrors());
	dispatch(setProfileLoading());
	axios
		.get('/api/profile')
		.then(res =>
			dispatch({
				payload: res.data,
				type: GET_PROFILE
			})
		)
		.catch(err =>
			dispatch({
				payload: {},
				type: GET_PROFILE
			})
		);
};

// Get profile by handle
export const getProfileByHandle = handle => dispatch => {
	dispatch(clearErrors());
	dispatch(setProfileLoading());
	axios
		.get(`/api/profile/handle/${handle}`)
		.then(res =>
			dispatch({
				payload: res.data,
				type: GET_PROFILE
			})
		)
		.catch(err => {
			dispatch({
				payload: null,
				type: GET_PROFILE
			});
		});
};

//get profiles
export const getProfiles = () => dispatch => {
	dispatch(clearErrors());
	dispatch(setProfileLoading());
	axios
		.get('/api/profile/all')
		.then(res =>
			dispatch({
				payload: res.data,
				type: GET_PROFILES
			})
		)
		.catch(err =>
			dispatch({
				payload: null,
				type: GET_PROFILES
			})
		);
};

//create profile
export const createProfile = (profileData, history) => dispatch => {
	dispatch(clearErrors());
	axios
		.post('/api/profile', profileData)
		.then(res => history.push('/dashboard'))
		.catch(err =>
			dispatch({
				payload: err.response.data,
				type: GET_ERRORS
			})
		);
};

//edit profile
export const editProfile = (profileData, history) => dispatch => {
	dispatch(clearErrors());
	axios
		.post('/api/profile', profileData)
		.then(res => history.push('/dashboard'))
		.catch(err =>
			dispatch({
				payload: err.response.data,
				type: GET_ERRORS
			})
		);
};

//add experience
export const addExperience = (expData, history) => dispatch => {
	dispatch(clearErrors());
	axios
		.post('/api/profile/experience', expData)
		.then(res => history.push('/dashboard'))
		.catch(err =>
			dispatch({
				payload: err.response.data,
				type: GET_ERRORS
			})
		);
};

//add education
export const addEducation = (eduData, history) => dispatch => {
	dispatch(clearErrors());
	axios
		.post('/api/profile/education', eduData)
		.then(res => history.push('/dashboard'))
		.catch(err =>
			dispatch({
				payload: err.response.data,
				type: GET_ERRORS
			})
		);
};

//delete education
export const deleteEducation = id => dispatch => {
	if (window.confirm('Are you sure? This cannot be undone!')) {
		dispatch(clearErrors());
		axios
			.delete(`/api/profile/education/${id}`)
			.then(res => dispatch({ payload: res.data, type: GET_PROFILE }))
			.catch(err =>
				dispatch({
					payload: err.response.data,
					type: GET_ERRORS
				})
			);
	}
};

//delete experience
export const deleteExperience = id => dispatch => {
	if (window.confirm('Are you sure? This cannot be undone!')) {
		dispatch(clearErrors());
		axios
			.delete(`/api/profile/experience/${id}`)
			.then(res =>
				dispatch({
					payload: res.data,
					type: GET_PROFILE
				})
			)
			.catch(err =>
				dispatch({
					payload: err.response.data,
					type: GET_ERRORS
				})
			);
	}
};

//delete account and profile
export const deleteAccount = () => dispatch => {
	if (window.confirm('Are you sure? This cannot be undone!')) {
		dispatch(clearErrors());
		axios
			.delete('/api/profile')
			.then(res =>
				dispatch({
					payload: {},
					type: SET_CURRENT_USER
				})
			)
			.catch(err =>
				dispatch({
					payload: err.response.data,
					type: GET_ERRORS
				})
			);
	}
};

//profile loading
export const setProfileLoading = () => {
	return {
		type: PROFILE_LOADING
	};
};

//clear profile
export const clearCurrentProfile = () => {
	return {
		type: CLEAR_CURRENT_PROFILE
	};
};

// Clear errors
export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS
	};
};
