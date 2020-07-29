import {combineReducers} from "redux";
import {appointmentReducer} from "./appointmentReducer";
import {staffReducer} from "./staffReducer";
import {dateReducer} from "./dateReducer";
import {customerReducer} from "./customerReducer";

export const rootReducer = combineReducers({
    appointmentList : appointmentReducer,
    staffList : staffReducer,
    customerList : customerReducer,
    date : dateReducer,
});
