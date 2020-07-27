import React from 'react';
import './App.css';
import CustomHeader from "../CustomHeader/CustomHeader";
import SchedulerContainer from "../../Container/SchedulerContainer";

function App() {
  return (
    <div className="App">
     <CustomHeader/>
     <SchedulerContainer/>
    </div>
  );
}

export default App;
