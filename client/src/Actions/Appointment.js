import {ADD_APPOINTMENT_LIST, ADD_CUSTOMER_LIST, ADD_STAFF_LIST} from "../Constant/ActionType";


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

export function setCustomer(appointmentList) {
    const customerList = appointmentList.map(list => {
        return  {
            'customer_Id' : list.customer_Id,
            'customer_Name': list.customer_Name,
            'customer_Gender': list.customer_Gender,
            'customer_Age': list.customer_Age
        }
    });
    return {
        type: ADD_CUSTOMER_LIST,
        payload: customerList
    }
}

