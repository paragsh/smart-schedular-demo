import { connect } from 'react-redux';
import CustomScheduler from "../component/Scheduler/CustomScheduler";
import {setAppointment, setCustomer, setStaff} from "../Actions/Appointment";
import {selectDate} from "../Actions/DateAction";

const mapStateToProps = (state, ownProps) => {
    return {
        appointmentList: state.appointmentList,
        staffList: state.staffList,
        serviceList: state.serviceList,
        customerList: state.customerList,
        dateState: state.date.selectedDate,
        isAdminPage: state.date.isAdminPage,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setAppointment: (list) => {
            dispatch(setAppointment(list))
        },
        setStaff: (list) => {
            dispatch(setStaff(list))
        },
        selectDate: (selectedDate) => {
            dispatch(selectDate(selectedDate))
        },
        setCustomer: (list) => {
            dispatch(setCustomer(list))
        }
    }
}

const SchedulerContainer = connect(mapStateToProps, mapDispatchToProps)(CustomScheduler);

export default SchedulerContainer
