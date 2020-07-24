import React from 'react';
import './App.css';
import CustomHeader from "../CustomHeader/CustomHeader";
import Scheduler from "../Scheduler/CustomScheduler";

function App() {
  return (
    <div className="App">
     <CustomHeader/>
     <Scheduler/>
    </div>
  );
}

export default App;
