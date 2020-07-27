import {ADD_APPOINTMENT_LIST, DELETE_APPOINTMENT_LIST} from "../Constant/ActionType";
import {newData} from "../utils/newData";

const initialState= newData['appointments'];
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
