import Row from "antd/lib/row";
import Col from "antd/lib/col";
import 'date-fns';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import React, {Component} from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {InputLabel} from '@material-ui/core';
import {allStaffList} from "../../../utils/getAllStaffList";
import MomentUtils from '@date-io/moment';
import moment from 'moment';

import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import {SaveAppointment} from "../../../utils/api";

export class NewEventPopover extends Component  {

    constructor(props) {
        super(props);
        this.state = {
            bookingDate: props.start.format("YYYY-MM-DD"),
            bookingFullTIme: props.start.toString(),
            bookingFormattedStartTIme: props.start.format('HH:ss'),
            bookingFormattedEndTIme: props.end.format('HH:ss'),
            selectedTreatmentId: '',
            treatmentDuration: 30,
            selectedStaffId: '',
            selectedStaffName: '',
            endTime: props.end.format("LT"),
            selectedCustomer: '',
        }
    }
    IfFirstAppointment='block';
    saveButtonClicked = () => {
        console.log(this.state);
        SaveAppointment(this.state).then(() =>
            this.props.fetchAndSetAppointmentList(this.state.bookingDate)
        );
    };

    handleDateChange = (eventItem) => {
        const bookingDate = eventItem.format("YYYY-MM-DD");
        this.setState({bookingDate : bookingDate})
    };

    handleTimeChange = (eventItem) => {
        const bookingFullTIme = eventItem.toString();
        const bookingFormattedStartTIme = eventItem.format('HH:ss');
        const duration = this.state.treatmentDuration;
        const updatedEndTime = moment(bookingFullTIme).add(duration, 'minutes').format("LT");
        this.setState({
            bookingFullTIme : bookingFullTIme,
            bookingFormattedStartTIme : bookingFormattedStartTIme,
            endTime : updatedEndTime,
        });
    };

    handleServiceList = (event, values) => {
        const treatmentId = values['id'];
        const duration = values['duration'];
        const originalStartTime = this.state.bookingFullTIme;
        const updatedEndTime = moment(originalStartTime).add(duration, 'minutes').format("LT");
        this.setState({
            selectedTreatmentId : treatmentId,
            treatmentDuration : duration,
            endTime : updatedEndTime,
        });
    };

    handleStaffList = (event, values) => {
        const staffName = values['name'];
        const staffId = values['id'];
        this.setState({
            selectedStaffId : staffId,
            selectedStaffName : staffName,
        });
    };

    handleCustomerList = (event, values) => {
        const customerId = values['customer_Id'];
        this.setState({
            selectedCustomerId : customerId,
        });
    };


    render() {
        const {eventItem, title, start, end, customerList, serviceList} = this.props;
        return (
            <div style={{width: '600px'}}>
                <Row type="flex" align="middle" style={{height: 40}}>
                    <Col span={2}/>
                    <Col span={22} className="overflow-text">
                        <span className="header2-text" title={title}>New Appointment</span>
                    </Col>
                </Row>
                <form noValidate autoComplete="off">
                <Row type="flex" align="middle" style={{display:this.IfFirstAppointment}}>
                    <Col span={2}/>
                    <Col span={22} className="overflow-text">
                        <span className="header2-text" title={title}>Confirmation Probability:30%</span>
                    </Col>
                </Row>
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
                                value={this.state.treatmentDuration + ' mins'}
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
                                value={this.state.endTime}
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
                                onChange={this.handleServiceList}
                                getOptionLabel={(option) => option['name']}
                                renderInput={(params) =>
                                    <TextField {...params} margin="normal" label="Service" variant="outlined"/>}
                            />
                        </Col>
                        <Col span={1}/>
                        <Col span={8} className="overflow-text">
                            <Autocomplete
                                id="staff-autocomplete"
                                options={allStaffList}
                                onChange={this.handleStaffList}
                                defaultValue={{
                                    "id": eventItem.resourceId,
                                    "name": eventItem.staffName
                                }}
                                size="small"
                                getOptionLabel={(option) => option['name']}
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
                                onChange={this.handleCustomerList}
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
                                color="primary" onClick={() => this.saveButtonClicked()}>
                            Book Appointment
                        </Button>
                    </Col>
                    <Col span={1}/>
                </Row>
            </div>);
    }
}
