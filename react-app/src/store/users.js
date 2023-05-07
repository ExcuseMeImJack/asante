// constants
const GET_USERS = "users/GET_USERS";
const GET_USER_PROFILE = "users/GET_USER_PROFILE";

const getUsers = (users) => ({
	type: GET_USERS,
	payload: users,
});

const getProfile = (profile) => ({
	type: GET_USER_PROFILE,
	payload: profile,
});

const initialState = { users: null, profile: null };

// get users thunk
export const getAllUsers = () => async (dispatch) => {
	const response = await fetch("/api/users/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
		dispatch(getUsers(data));
	}
};

// get user profile thunk
export const getUserProfile = (userId) => async (dispatch) => {
	const response = await fetch(`/api/users/${userId}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
		dispatch(getProfile(data));
	}
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_USERS:
			return state = {...state, users: action.payload.users };
		case GET_USER_PROFILE:
			return state = {...state, profile: action.payload };
		default:
			return state;
	}
}
