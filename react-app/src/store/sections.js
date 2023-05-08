// constants
const GET_SECTIONS = "sections/GET_SECTIONS";
const GET_SECTION = "sections/GET_SECTION";
const ADD_SECTION = "sections/ADD_SECTION";
const EDIT_SECTION = "sections/EDIT_SECTION";

const getSections = (sections) => ({
	type: GET_SECTIONS,
	payload: sections,
});

const getSection = (section) => ({
	type: GET_SECTION,
	payload: section,
});

const addSection = (section) => ({
	type: ADD_SECTION,
	payload: section,
});

const editSection = (section) => ({
	type: EDIT_SECTION,
	payload: section,
});


// get sections by board id thunk
export const getSectionsByBoardId = (boardId) => async (dispatch) => {
    const response = await fetch(`/api/boards/${boardId}/sections`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(getSections(data.sections));
    }
};

// get section by section id thunk
export const getSectionById = (sectionId) => async (dispatch) => {
    const response = await fetch(`/api/sections/${sectionId}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(getSection(data.Section));
    }
};

// add section by board id
export const addSectionByBoardId = (section, boardId) => async (dispatch) => {
    console.log(section, boardId)
    const response = await fetch(`/api/sections/${boardId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(section)
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(addSection(data.Section));
    }
}

// edit section by section id
export const editSectionByBoardId = (section, sectionId) => async (dispatch) => {
    const response = await fetch(`/api/sections/${sectionId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(section)
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(editSection(data.Section));
    }
}

const initialState = { sections: null, section: null };

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_SECTIONS: {
			const newState = {...state, sections: action.payload };
            return newState
        }
		case GET_SECTION: {
            const newState = {...state, section: action.payload };
			return newState
        }
        case ADD_SECTION: {
            const newState = { ...state }
            newState.sections = [...state.sections, action.payload]
			newState.section = action.payload
            return newState
        }
        case EDIT_SECTION: {
            const newState = { ...state }
            newState.sections = [...state.sections, action.payload]
			newState.section = action.payload
            return newState
        }
		default:
			return state;
	}
}
