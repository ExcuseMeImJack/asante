// constants
const GET_SECTIONS = "sections/GET_SECTIONS";
const GET_SECTION = "sections/GET_SECTION";
const ADD_SECTION = "sections/ADD_SECTION";
const EDIT_SECTION = "sections/EDIT_SECTION";
const MOVE_SECTION = "sections/MOVE_SECTION";
const DELETE_SECTION = "sections/DELETE_SECTION";

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

const deleteSection = (section) => ({
    type: DELETE_SECTION,
    payload: section,
});

const moveSection = (sections) => ({
	type: MOVE_SECTION,
	payload: sections,
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
        console.log('Get sections thunk', data.sections)
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
export const editSectionBySectionId = (section, sectionId) => async (dispatch) => {
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

// move section
export const orderSections = (sections, boardId) => async (dispatch) => {
    console.log('Sections in thunk', sections)
    dispatch(moveSection(sections));
    const response = await fetch(`/api/sections/${boardId}/move`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(sections)
    });
}


const initialState = { sections: [], section: null };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_SECTIONS: {
            const newState = { ...state, sections: action.payload };
            return newState
        }
        case GET_SECTION: {
            const newState = { ...state, section: action.payload };
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
            const id = action.payload.id
            const section = newState.sections.find(section => section.id === id)
            const index = newState.sections.indexOf(section)
            newState.sections[index] = action.payload
            newState.section = action.payload
            return newState
        }
        case DELETE_SECTION: {
            const newState = { ...state }
            newState.sections = [...state.sections]
            const id = action.payload.id
            const section = newState.sections.find(section => section.id === id)
            const index = newState.sections.indexOf(section)
            newState.sections.splice(index, 1)
            return newState
        }
        case MOVE_SECTION: {
            const newState = { ...state }
            newState.sections = action.payload
            console.log('CASE ', newState.sections.map(section => section.name))
            return newState
        }
		default:
			return state;
	}
}
