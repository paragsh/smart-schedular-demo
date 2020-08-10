import React, {Component} from 'react';
import './App.css';
import CustomHeader from "../CustomHeader/CustomHeader";
import SchedulerContainer from "../../Container/SchedulerContainer";

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <CustomHeader toggleIsAdmin={this.props.toggleIsAdmin}/>
                <SchedulerContainer/>
            </div>
        );
    }
}

export default App;
