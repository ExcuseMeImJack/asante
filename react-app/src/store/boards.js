// constants
const GET_BOARD = "boards/GET_BOARD";
const GET_USER_BOARDS = "boards/GET_USER_BOARDS";

const getBoard = (board) => ({
	type: GET_BOARD,
	payload: board,
});

const getUserBoards = (boards) => ({
	type: GET_USER_BOARDS,
	payload: boards,
});

const initialState = { board: null, boards: null };

// get board by board id thunk
export const getBoardById = (boardId) => async (dispatch) => {
	const response = await fetch(`/api/boards/${boardId}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
		dispatch(getBoard(data));
	}
}

// get boards by user id thunk
export const getBoardsByUserId = (userId) => async (dispatch) => {
	const response = await fetch(`/api/users/${userId}/boards`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
		dispatch(getUserBoards(data));
	}
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_BOARD:
			return state = {...state, board: action.payload };
		case GET_USER_BOARDS:
			return state = {...state, boards: action.payload };
		default:
			return state;
	}
}
