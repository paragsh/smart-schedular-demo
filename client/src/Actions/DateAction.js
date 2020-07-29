import {ADD_DATE} from "../Constant/ActionType";


export function selectDate(date) {
    return {
        type: ADD_DATE,
        payload: date
    }

}
