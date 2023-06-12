// constants
const GET_BOARD = "boards/GET_BOARD";
const GET_USER_BOARDS = "boards/GET_USER_BOARDS";
const ADD_BOARD = "boards/ADD_BOARD";
const DELETE_BOARD = "boards/DELETE_BOARD";

const getBoard = (board) => ({
	type: GET_BOARD,
	payload: board,
});

const getUserBoards = (boards) => ({
	type: GET_USER_BOARDS,
	payload: boards,
});

const addBoard = (board) => ({
    type: ADD_BOARD,
    payload: board,
});

const deleteBoard = (board) => ({
    type: DELETE_BOARD,
    payload: board,
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
		dispatch(getBoard(data.Board));
	}
}

// get boards by user
export const getBoardsByUserId = () => async (dispatch) => {
	const response = await fetch(`/api/users/boards`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
		dispatch(getUserBoards(data.Boards));
	}
}

// create new board thunk
export const createBoard = (board) => async (dispatch) => {
    const response = await fetch(`/api/boards`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(board)
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(addBoard(data.Board));
		return data.Board
    }
}

// delete board
export const deleteBoardById = (board) => async (dispatch) => {
	const response = await fetch(`/api/boards/${board.id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	})
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
		dispatch(deleteBoard(board))
	}
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_BOARD: {
			const newState = {...state, board: action.payload };
			return newState
		}
		case GET_USER_BOARDS: {
			const newState = {...state, boards: action.payload };
			return newState
		}
		case ADD_BOARD: {
			const newState = { ...state }
			newState.boards = [...state.boards, action.payload]
			newState.board = action.payload
            return newState
		}
		case DELETE_BOARD: {
			const newState = { ...state }
			newState.boards = [...state.boards]
			const id = action.payload.id
			const board = newState.boards.find(board => board.id === id)
			const index = newState.boards.indexOf(board)
			newState.boards.splice(index, 1)
			return newState
		}
		default:
			return state;
	}
}
