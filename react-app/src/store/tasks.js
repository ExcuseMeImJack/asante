// constants
const GET_TASK = "tasks/GET_TASK";
const GET_ALL_TASKS = "tasks/GET_ALL_TASKS";
const GET_USER_TASKS = "tasks/GET_USER_TASKS";

const getTask = (task) => ({
	type: GET_TASK,
	payload: task,
});

const getAllTasks = (tasks) => ({
	type: GET_ALL_TASKS,
	payload: tasks,
});

const getUserTasks = (tasks) => ({
	type: GET_USER_TASKS,
	payload: tasks,
});

const initialState = { tasks: null, task: null };

// get task by id thunk
export const getTaskById = (taskId) => async (dispatch) => {
	const response = await fetch(`/api/tasks/${taskId}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
		dispatch(getTask(data.Task));
	}
}

// get all tasks by sectionId thunk
export const getAllTasksBySectionId = (sectionId) => async (dispatch) => {
	console.log(sectionId)
	const response = await fetch(`/api/tasks/section/${sectionId}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		console.log('thunk data',data)
		if (data.errors) {
			return;
		}
		dispatch(getAllTasks(data.Tasks));
	}
}

// get all tasks by user
export const getTasksByUserId = () => async (dispatch) => {
	const response = await fetch(`/api/users/tasks`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
		dispatch(getUserTasks(data.Tasks));
	}
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_TASK:
			return state = {...state, task: action.payload };
		case GET_USER_TASKS:
			return state = {...state, tasks: action.payload };
		case GET_ALL_TASKS:
			return state = {...state, tasks: action.payload };
		default:
			return state;
	}
}
