import {ADD_DATE, TOGGLE_IS_ADMIN} from "../Constant/ActionType";


export function selectDate(date) {
    return {
        type: ADD_DATE,
        payload: date
    }

}

export function toggleIsAdmin() {
    return {
        type: TOGGLE_IS_ADMIN
    }
}
