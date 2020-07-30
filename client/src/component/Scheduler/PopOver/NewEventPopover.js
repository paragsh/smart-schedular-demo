import Row from "antd/lib/row";
import Col from "antd/lib/col";
import 'date-fns';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import React, {useState, Component} from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import 'date-fns';
import { InputLabel } from '@material-ui/core';
import {allStaffList} from "../../../utils/getAllStaffList";
import DateFnsUtils from '@date-io/date-fns';
import MomentUtils from '@date-io/moment';

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    KeyboardTimePicker,
} from '@material-ui/pickers';

export class NewEventPopover extends Component  {

    constructor(props) {
        super(props);
        this.state = {
            bookingDate: props.start.format("YYYY-MM-DD"),
            duration: 0,
            bookingFullTIme: props.start.toString(),
            bookingFormattedStartTIme: props.start.format('HH:ss'),
            bookingFormattedEndTIme: props.end.format('HH:ss'),
            selectedService: ''
        }
    }

    saveButtonClicked = (eventItem) => {
        alert(`You just clicked saveButtonClicked button. event title: ${eventItem.title}`);
    };

    handleDateChange = (eventItem) => {
        this.setState({bookingDate : eventItem.format("YYYY-MM-DD")})
    };

    handleTimeChange = (eventItem) => {
        this.setState({
            bookingFullTIme : eventItem.toString(),
            bookingFormattedStartTIme : eventItem.format('HH:ss'),
        });
    };

    handleServiceList = (eventItem) => {
        console.log(eventItem);
        this.setState({
            selectedService : eventItem,
        });
    };


    render() {
        const {eventItem, title, start, end, customerList, serviceList} = this.props;
        const duration = 60;
        const endTime = start.add(duration, 'minutes');
        return (
            <div style={{width: '600px'}}>
                <Row type="flex" align="middle" style={{height: 40}}>
                    <Col span={2}/>
                    <Col span={22} className="overflow-text">
                        <span className="header2-text" title={title}>New Appointment</span>
                    </Col>
                </Row>
                <form noValidate autoComplete="off">
                    <Row type="flex" align="middle" style={{marginTop: 5, marginDown: 5}}>
                        <Col span={2}/>
                        <Col span={22} className="overflow-text">
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                    <KeyboardDatePicker
                                        variant="inline"
                                        format="DD/MM/yyyy"
                                        margin="normal"
                                        id="date-picker-booking-date"
                                        label="Select Date"
                                        value={this.state.bookingDate}
                                        onChange={this.handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                            </MuiPickersUtilsProvider>
                        </Col>
                    </Row>

                    <Row type="flex" align="middle" style={{marginTop: 5, marginDown: 5}}>
                        <Col span={2}/>
                        <Col span={4} className="overflow-text">
                            <TextField
                                disabled
                                id="Duration"
                                label="Duration"
                                margin="normal"
                                defaultValue={this.state.duration + ' mins'}
                                variant="filled"
                            />
                            <InputLabel/>
                        </Col>
                        <Col span={2}/>
                        <Col span={6} className="overflow-text">
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <KeyboardTimePicker
                                    disableToolbar
                                    variant="inline"
                                    format="hh:mm"
                                    margin="normal"
                                    id="start-time"
                                    inputVariant="outlined"
                                    minutesStep={30}
                                    label="Start Time"
                                    value={this.state.bookingFullTIme}
                                    onChange={this.handleTimeChange}
                                />
                            </MuiPickersUtilsProvider>
                        </Col>
                        <Col span={2}/>
                        <Col span={4} className="overflow-text">
                            <TextField
                                disabled
                                id="End Time"
                                margin="normal"
                                label="End Time"
                                defaultValue={endTime.format("HH:mm")}
                                variant="filled"
                            />
                        </Col>
                        <Col span={2}/>
                    </Row>
                    <Row type="flex" align="middle">
                        <Col span={2}/>
                        <Col span={12} className="overflow-text">
                            <Autocomplete
                                id="serviceList-autocomplete"
                                options={serviceList}
                                size="small"
                                getOptionLabel={(option) => option['name']}
                                renderInput={(params) =>
                                    <TextField {...params}onChange={this.handleServiceList} margin="normal" label="Service" variant="outlined"/>}
                            />
                        </Col>
                        <Col span={1}/>
                        <Col span={8} className="overflow-text">
                            <Autocomplete
                                id="serviceList-autocomplete"
                                options={allStaffList}
                                size="small"
                                getOptionLabel={(option) => option['Name']}
                                renderInput={(params) => <TextField {...params} margin="normal" label="Staff"
                                                                    variant="outlined"/>}
                            />
                        </Col>
                    </Row>
                    <Row type="flex" align="middle">
                        <Col span={2}/>
                        <Col span={12} className="overflow-text">
                            <Autocomplete
                                id="customerList-autocomplete"
                                options={customerList}
                                getOptionLabel={(option) => option['customer_Name']}
                                size="small"
                                renderInput={(params) => <TextField {...params} margin="normal" label="Customer Name"
                                                                    variant="outlined"/>}
                            />
                        </Col>
                    </Row>
                </form>

                <Row type="flex" align="middle" style={{paddingTop: 10}}>
                    <Col span={10}/>
                    <Col span={3}>
                        <Button color="primary">
                            Cancel
                        </Button>
                    </Col>
                    <Col span={2}/>
                    <Col span={8}>
                        <Button variant="contained"
                                color="primary" onClick={() => this.saveButtonClicked(eventItem)}>
                            Book Appointment
                        </Button>
                    </Col>
                    <Col span={1}/>
                </Row>
            </div>);
    }
}
