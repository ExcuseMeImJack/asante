// constants
const GET_USERS = "users/GET_USERS";

const getUsers = (users) => ({
	type: GET_USERS,
	payload: users,
});

const initialState = { users: null };

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
        console.log(data)
		dispatch(getUsers(data));
	}
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_USERS:
			return state = {...state, users: action.payload };
		default:
			return state;
	}
}
