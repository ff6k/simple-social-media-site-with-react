import {
	ADD_POST,
	DELETE_POST,
	GET_POSTS,
	POST_LOADING
} from './../actions/types';

const initialState = {
	loading: false,
	post: {},
	posts: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case ADD_POST:
			return {};
		case DELETE_POST:
			return {};
		case GET_POST:
			return {};
		case GET_POSTS:
			return {};
		case POST_LOADING:
			return {};
		default:
			return state;
	}
}
