import {ADD_DATE, TOGGLE_IS_ADMIN} from "../Constant/ActionType";

const initialState= {selectedDate : '2020-08-17', isAdminPage: false};
export const dateReducer = function (state = initialState, action) {
    switch (action.type) {
        case ADD_DATE:
            return { selectedDate: action.payload, isAdminPage: state.isAdminPage};
        case TOGGLE_IS_ADMIN:
            return { selectedDate: state.selectedDate, isAdminPage: !state.isAdminPage};
        default:
            return state;
    }
};
