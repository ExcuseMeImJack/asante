// constants
const GET_SECTIONS = "sections/GET_SECTIONS";
const GET_SECTION = "sections/GET_SECTION";
const ADD_SECTION = "sections/ADD_SECTION";

const getSections = (sections) => ({
	type: GET_SECTIONS,
	payload: sections,
});

const getSection = (section) => ({
	type: GET_SECTION,
	payload: section,
});

const addSection = (section) => ({
	type: GET_SECTION,
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

export const addSectionByBoardId = (section, boardId) => async (dispatch) => {
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
		default:
			return state;
	}
}
