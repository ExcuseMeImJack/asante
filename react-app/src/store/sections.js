// constants
const GET_SECTIONS = "sections/GET_SECTIONS";
const GET_SECTION = "sections/GET_SECTION";

const getSections = (sections) => ({
	type: GET_SECTIONS,
	payload: sections,
});

const getSection = (section) => ({
	type: GET_SECTION,
	payload: section,
});

const initialState = { sections: null, section: null };

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

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_SECTIONS:
			return state = {...state, sections: action.payload };
		case GET_SECTION:
			return state = {...state, section: action.payload };
		default:
			return state;
	}
}
