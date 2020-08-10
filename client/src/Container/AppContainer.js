import { connect } from 'react-redux';
import {toggleIsAdmin} from "../Actions/DateAction";
import App from "../component/App/App";

const mapStateToProps = (state, ownProps) => {
    return {
        isAdminPage: state.date.isAdminPage,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        toggleIsAdmin: () => {
            dispatch(toggleIsAdmin())
        }
    }
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer
