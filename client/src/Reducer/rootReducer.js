import {combineReducers} from "redux";
import {appointmentReducer} from "./appointmentReducer";
import {staffReducer} from "./staffReducer";
import {dateReducer} from "./dateReducer";

export const rootReducer = combineReducers({
    appointmentList : appointmentReducer,
    staffList : staffReducer,
    date : dateReducer,
});
