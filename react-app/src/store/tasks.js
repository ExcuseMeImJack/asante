// constants
const GET_TASK = "tasks/GET_TASK";
const GET_ALL_TASKS_BY_SECTION = "tasks/GET_ALL_TASKS_BY_SECTION";
const GET_USER_TASKS = "tasks/GET_USER_TASKS";
const ADD_TASK = "tasks/ADD_TASK";
const EDIT_TASK = "tasks/EDIT_TASK";
const DELETE_TASK = "tasks/DELETE_TASK";

const getTask = (task) => ({
	type: GET_TASK,
	payload: task,
});

const getAllTasksBySection = (tasks) => ({
	type: GET_ALL_TASKS_BY_SECTION,
	payload: tasks,
});

const getUserTasks = (tasks) => ({
	type: GET_USER_TASKS,
	payload: tasks,
});

const addTask = (task) => ({
	type: ADD_TASK,
	payload: task,
});

const editTask = (task) => ({
	type: EDIT_TASK,
	payload: task,
});

const deleteTask = (task) => ({
	type: DELETE_TASK,
	payload: task,
});


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
	const response = await fetch(`/api/tasks/section/${sectionId}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
		dispatch(getAllTasksBySection(data.Tasks));
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

// add new task by section id
export const addTaskBySectionId = (task, sectionId) => async (dispatch) => {
    const response = await fetch(`/api/users/task/${sectionId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task)
    });

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(addTask(data.Task));
    }
}

// edit task by task id
export const editTaskByTaskId = (task, taskId) => async (dispatch) => {
    const response = await fetch(`/api/users/task/${taskId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task)
    });

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(editTask(data.Task));
    }
}

// delete task by task id
export const deleteTaskByTaskId = (task) => async (dispatch) => {
    const response = await fetch(`/api/tasks/${task.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(deleteTask(task));
    }
}

const initialState = { tasks: null, task: null };

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_TASK:
			return state = {...state, task: action.payload };
		case GET_USER_TASKS:
			return state = {...state, tasks: action.payload };
		case GET_ALL_TASKS_BY_SECTION:
			return state = {...state, tasks: action.payload };
		case ADD_TASK: {
			const newState = { ...state }
			newState.tasks = [...state.tasks, action.payload]
			newState.task = action.payload
            return newState
		}
		case EDIT_TASK: {
            const newState = { ...state }
            const id = action.payload.id
            const task = newState.tasks.find(task => task.id === id)
            const index = newState.tasks.indexOf(task)
            newState.tasks[index] = action.payload
			newState.task = action.payload
            return newState
        }
		case DELETE_TASK: {
            const newState = { ...state }
            const id = action.payload.id
            const task = newState.tasks.find(task => task.id === id)
            const index = newState.tasks.indexOf(task)
            newState.tasks.splice(index, 1)
            return newState
        }
		default:
			return state;
	}
}
