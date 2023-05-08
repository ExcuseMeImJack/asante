// constants
const GET_USER_PROFILE = "users/GET_USER_PROFILE";

const getProfile = (profile) => ({
	type: GET_USER_PROFILE,
	payload: profile,
});

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

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_USER_PROFILE:
			return state = {...state, profile: action.payload };
		default:
			return state;
	}
}
