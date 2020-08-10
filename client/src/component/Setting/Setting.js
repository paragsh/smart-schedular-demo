import React from 'react';
import './Setting.css';

export const Setting = () => {
    return (
        <div className="overlay">
            <div className="settings">
                <header>
                    <h1>Settings</h1>
                </header>
                <main>
                    <div className="block flex">
                        <div className="text">Allow SMARTER to send Auto-Reminders for all Booked Appointments</div>
                        <label className="switch">
                            <input type="checkbox" checked/>
                            <span className="slider round"/>
                        </label>
                    </div>
                    <div className="block flex">
                        <div className="text">Allow SMARTER to send Auto-Reminders for
                            Appointments with High No Show Probability
                        </div>
                        <label className="switch">
                            <input type="checkbox" checked/>
                            <span className="slider round"/>
                        </label>
                    </div>
                    <div className="block">
                        <strong>Cut-off time for auto - cancelling Bookings with High No Show Probability</strong>
                        <label className="container">
                            <div>24 Hours prior to the appointment time</div>
                            <input type="radio" checked="checked" name="radio1"/>
                            <span class="checkmark"/>
                        </label>
                        <label className="container">
                            <div>12 Hours prior to the appointment time</div>
                            <input type="radio" checked="checked" name="radio1"/>
                            <span className="checkmark"/>
                        </label>
                        <label className="container">
                            <div>Custom cut-off time</div>
                            <input type="radio" checked="checked" name="radio1"/>
                            <span className="checkmark"/>
                        </label>
                    </div>
                    <div className="block">
                        <strong>Cut-off time for auto - cancelling Bookings with High No Show Probability</strong>
                        <label className="container">
                            <div>24 Hours prior to the appointment time</div>
                            <input type="radio" checked="checked" name="radio"/>
                            <span className="checkmark"/>
                        </label>
                        <label className="container">
                            <div>12 Hours prior to the appointment time</div>
                            <input type="radio" checked="checked" name="radio"/>
                            <span className="checkmark"/>
                        </label>
                        <label className="container">
                            <div>Custom cut-off time</div>
                            <input type="radio" checked="checked" name="radio"/>
                            <span className="checkmark"/>
                        </label>
                    </div>
                </main>
            </div>
        </div>
)};
