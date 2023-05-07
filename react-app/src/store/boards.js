// constants
const GET_BOARD = "boards/GET_BOARD";

const getBoard = (board) => ({
	type: GET_BOARD,
	payload: board,
});

const initialState = { board: null };

// get boards thunk
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
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_BOARD:
			return state = {...state, board: action.payload };
		default:
			return state;
	}
}
