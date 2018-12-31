import {
	ADD_POST,
	DELETE_POST,
	GET_POST,
	GET_POSTS,
	POST_LOADING
} from '../actions/types';

const initialState = {
	loading: false,
	post: {},
	posts: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case ADD_POST:
			return {
				...state,
				posts: [action.payload, ...state.posts]
			};
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter(post => post._id !== action.payload)
			};
		case GET_POST:
			return {
				...state,
				loading: false,
				post: action.payload
			};
		case GET_POSTS:
			return {
				...state,
				loading: false,
				posts: action.payload
			};
		case POST_LOADING:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
}
