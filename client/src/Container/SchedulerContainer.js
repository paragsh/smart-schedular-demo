import { connect } from 'react-redux';
import CustomScheduler from "../component/Scheduler/CustomScheduler";
import {addAppointment} from "../Actions/Appointment";

const mapStateToProps = (state, ownProps) => {
    return {
        appointmentList: state.appointmentList,
        staffList: state.staffList,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(addAppointment())
        }
    }
}

const SchedulerContainer = connect(mapStateToProps, mapDispatchToProps)(CustomScheduler);

export default SchedulerContainer
