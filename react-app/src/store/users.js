// constants
const GET_USER_PROFILE = "users/GET_USER_PROFILE";
const LOGOUT_USER = "users/LOGOUT_USER";
// const DELETE_USER = "users/DELETE_USER";

const getProfile = (profile) => ({
	type: GET_USER_PROFILE,
	payload: profile,
});

const logoutUser = () => ({
	type: LOGOUT_USER
});

// const deleteUser = (profile) => ({
// 	type: GET_USER_PROFILE,
// 	payload: profile,
// });

const initialState = { users: null, profile: null };

// get user profile thunk
export const getUserProfile = () => async (dispatch) => {
	const response = await fetch(`/api/users`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
		dispatch(getProfile(data.user));
	}
};

// logout user
export const logoutUserThunk = () => async (dispatch) => {
	const response = await fetch(`/api/auth/logout`);
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
		dispatch(logoutUser());
	}
}

// Delete user
export const deleteUserThunk = (user) => async (dispatch) => {
	const response = await fetch(`/api/users`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(user)
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
		dispatch(logoutUser());
	}
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_USER_PROFILE:
			return state = {...state, profile: action.payload };
		case LOGOUT_USER: {
			return initialState
		}
		default:
			return state;
	}
}
