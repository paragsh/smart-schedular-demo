import { connect } from 'react-redux';
import CustomScheduler from "../component/Scheduler/CustomScheduler";
import {addAppointment} from "../Actions/Appointment";
import {selectDate} from "../Actions/DateAction";

const mapStateToProps = (state, ownProps) => {
    return {
        appointmentList: state.appointmentList,
        staffList: state.staffList,
        dateState: state.date.selectedDate,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(addAppointment())
        },
        selectDate: (selectedDate) => {
            dispatch(selectDate(selectedDate))
        }
    }
}

const SchedulerContainer = connect(mapStateToProps, mapDispatchToProps)(CustomScheduler);

export default SchedulerContainer
