import {combineReducers} from "redux";
import {appointmentReducer} from "./appointmentReducer";
import {staffReducer} from "./staffReducer";

export const rootReducer = combineReducers({
    appointmentList : appointmentReducer,
    staffList : staffReducer,
});
