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
import {fetchWaitListConfirmation, SaveAppointment} from "../../../utils/api";
import {getBorderColor, getProbabilityMeterColor} from "../../../Constant/color";

export class NewEventPopover extends Component  {

    constructor(props) {
        super(props);
        this.state = {
            checkProbability : 100,
            bookingDate: props.start.format("YYYY-MM-DD"),
            bookingFullTIme: props.start.toString(),
            bookingFormattedStartTIme: props.start.format('HH:ss'),
            bookingFormattedEndTIme: props.end.format('HH:ss'),
            selectedTreatmentId: '',
            treatmentDuration: 30,
            confirmationProbability: 0,
            selectedStaffId: props.eventItem.resourceId,
            selectedStaffName: props.eventItem.staffName,
            endTime: props.end.format("LT"),
            selectedCustomer: '',
        }
    }
    IfFirstAppointment='block';
    saveButtonClicked = () => {
        this.props.fetchAndSetAppointmentList(this.state.bookingDate);
    };

    predictButtonClicked = () => {
        SaveAppointment(this.state).then((res)=>  {
            const checkProbability = res.probability.toFixed(2);
            this.setState({checkProbability : checkProbability})
            }
        )
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
        if (!!values) {
            const staffName = values['name'];
            const staffId = values['id'];
            this.setState({
                selectedStaffId : staffId,
                selectedStaffName : staffName,
            });
        }
    };

    handleCustomerList = (event, values) => {
        const customerId = values['customer_Id'];
        this.setState({
            selectedCustomerId : customerId,
        });
    };

    componentDidMount() {
        this.checkWaitingProbabality();
    }

    checkWaitingProbabality() {
        const {appointmentList, end, start, eventItem} = this.props;
        function conditions(list) {
            const existBlockStart = moment(list.start_Date).format();
            const existBlockEnd = moment(list.end_Date).format();

            const newBlockStart = start.format();
            const newBlockEnd = end.format();


            const conditionOne = newBlockStart === existBlockStart;
            const conditionTwo = existBlockStart <= newBlockStart && newBlockStart < existBlockEnd;
            const conditionThree = newBlockEnd === existBlockEnd;
            const conditionFour = existBlockStart < newBlockEnd && newBlockEnd <= existBlockEnd;
            const allConditions = (conditionTwo && conditionThree) || (conditionOne && conditionFour) || conditionTwo || conditionFour ;
            return allConditions;
        }

        const filteredBySameStaff = appointmentList.filter(list => ((list.employee_Id === eventItem.resourceId)));
        const probabilityList = filteredBySameStaff.filter(list => (conditions(list))).map(list=>list.probability);
        if(probabilityList.length>0){
            const probabilityString = probabilityList.join();
            fetchWaitListConfirmation(probabilityString).then(res => {
                let resFloat = res[0].toFixed(2);
                this.setState({confirmationProbability : resFloat});
            });
        }

    }

    render() {
        const {eventItem, title, start, end, customerList, serviceList} = this.props;
        const probabilityCheckerText  = this.state.checkProbability === 100? 'Check No-Show Probability' : ("Cancellation Probability : " + this.state.checkProbability +"%");
        const confirmationProbabilityText = 'Confirmation Probability ' + this.state.confirmationProbability + '%';
        const probabilityColor = getProbabilityMeterColor(this.state.checkProbability);
        const probabilityBorderColor = getBorderColor(probabilityColor);
        return (
            <div style={{width: '600px'}}>
                <Row type="flex" align="middle" style={{height: 40}}>
                    <Col span={24} className="mbHeader">
                        <span className="nameTitle" title={title}>New Appointment</span>
                    </Col>
                </Row>
                <form noValidate autoComplete="off">
                    <Row type="flex" align="middle" style={{marginTop: 5, marginDown: 5}}>
                        <Col span={12} className="bodyText">
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
                        <Col span={1} />
                        { (this.state.confirmationProbability > 0) &&<Col span={11} className="bodyText">
                                <span className="ConfirmationPro"
                                      title={title}>
                                    {confirmationProbabilityText}
                                </span>
                        </Col>}
                    </Row>

                    <Row type="flex" align="middle" style={{marginTop: 5, marginDown: 5}}>
                        <Col span={7} className="bodyText">
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <KeyboardTimePicker
                                    disableToolbar
                                    format="hh:mm"
                                    margin="normal"
                                    id="start-time"
                                    minutesStep={30}
                                    label="Start Time"
                                    value={this.state.bookingFullTIme}
                                    onChange={this.handleTimeChange}
                                />
                            </MuiPickersUtilsProvider>
                        </Col>
                        <Col span={1}/>
                        <Col span={7} className="bodyText">
                            <TextField
                                disabled
                                id="End Time"
                                margin="normal"
                                label="End Time"
                                value={this.state.endTime}
                            />
                        </Col>
                        <Col span={1}/>
                        <Col span={7} className="bodyText">
                            <TextField
                                disabled
                                id="Duration"
                                label="Duration"
                                margin="normal"
                                value={this.state.treatmentDuration + ' mins'}
                            />
                            <InputLabel/>
                        </Col>
                    </Row>
                    <Row type="flex" align="middle">
                        <Col span={12} className="bodyText">
                            <Autocomplete
                                id="serviceList-autocomplete"
                                options={serviceList}
                                size="small"
                                onChange={this.handleServiceList}
                                getOptionLabel={(option) => option['name']}
                                renderInput={(params) =>
                                    <TextField {...params} margin="normal" label="Service" />}
                            />
                        </Col>
                        <Col span={1}/>
                        <Col span={11} className="bodyText">
                            <Autocomplete
                                id="staff-autocomplete"
                                options={allStaffList}
                                onChange={this.handleStaffList}
                                defaultValue={{
                                    "id": this.state.selectedStaffId,
                                    "name": this.state.selectedStaffName
                                }}
                                size="small"
                                getOptionLabel={(option) => option['name']}
                                renderInput={(params) =>
                                    <TextField {...params} margin="normal" label="Staff" />}
                            />
                        </Col>
                    </Row>
                    <Row type="flex" align="middle">
                        <Col span={12} className="bodyText">
                            <Autocomplete
                                id="customerList-autocomplete"
                                options={customerList}
                                getOptionLabel={(option) => option['customer_Name']}
                                onChange={this.handleCustomerList}
                                size="small"
                                renderInput={(params) =>
                                    <TextField {...params} margin="normal" label="Customer Name" />}
                            />
                        </Col>
                        <Col span={1} />
                            <Col span={11} className="bodyText">
                                <span className="ConfirmationPro" style={{color:probabilityBorderColor, border: "1px solid"+ probabilityBorderColor }}
                                      onClick={()=>this.predictButtonClicked()}
                                      title={title}>
                                    {probabilityCheckerText}
                                </span>
                            </Col>
                    </Row>
                </form>

                <Row type="flex" className="btn" align="middle" style={{paddingTop: 10}}>
                    <Col span={24}>
                        <Button className="btn-black">
                            Cancel
                        </Button>
                        <Button className="btn-blue" onClick={() => this.saveButtonClicked()}> Book Appointment
                        </Button>
                    </Col>
                </Row>
            </div>);
    }
}
