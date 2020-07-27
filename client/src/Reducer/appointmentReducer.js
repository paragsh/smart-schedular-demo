import {ADD_APPOINTMENT_LIST, DELETE_APPOINTMENT_LIST} from "../Constant/ActionType";
import {getEvents} from "../utils/Data.util";


const initialState= getEvents();
export const appointmentReducer = function (state = initialState, action) {
    switch (action.type) {
        case ADD_APPOINTMENT_LIST:
            return {...state, data: action.payload};
        case DELETE_APPOINTMENT_LIST:
            return {...state, data: action.payload};
        default:
            return state;
    }
};
