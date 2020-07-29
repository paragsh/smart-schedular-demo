import {ADD_APPOINTMENT_LIST, ADD_STAFF_LIST} from "../Constant/ActionType";


export function setAppointment(appointmentList) {
    return {
        type: ADD_APPOINTMENT_LIST,
        payload: appointmentList
    }
}

export function setStaff(staffList) {
    return {
        type: ADD_STAFF_LIST,
        payload: staffList
    }
}

