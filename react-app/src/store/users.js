// constants
const GET_USERS = "users/GET_USERS";

const getUsers = (users) => ({
	type: GET_USERS,
	payload: users,
});

const initialState = { users: null };

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

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_USERS:
			return state = {...state, users: action.payload.users };
		default:
			return state;
	}
}
