import {ADD_DATE} from "../Constant/ActionType";

const initialState= {selectedDate : '2020-08-17'};
export const dateReducer = function (state = initialState, action) {
    switch (action.type) {
        case ADD_DATE:
            return { selectedDate: action.payload};
        default:
            return state;
    }
};
