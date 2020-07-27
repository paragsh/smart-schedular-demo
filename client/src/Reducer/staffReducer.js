import {ADD_STAFF_LIST, DELETE_STAFF_LIST} from "../Constant/ActionType";
import {getResources} from "../utils/Data.util";


const initialState= getResources();
export const staffReducer = function (state = initialState, action) {
    switch (action.type) {
        case ADD_STAFF_LIST:
            return {...state, data: action.payload};
        case DELETE_STAFF_LIST:
            return {...state, data: action.payload};
        default:
            return state;
    }
};
