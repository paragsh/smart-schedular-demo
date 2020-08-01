import React, {Component} from 'react'
import Scheduler, {SchedulerData, ViewTypes } from 'react-big-scheduler';
import withDragDropContext from './withDnDContext';
import 'react-big-scheduler/lib/css/style.css';

import {
    getBorderColor, getProbabilityMeterColor,
    PURPLE,
} from "../../Constant/color";
import {NewEventPopover} from "./PopOver/NewEventPopover";
import {existingEventPopOver} from "./PopOver/ExistingEventPopOver";
import {eventTemplate} from "./EventTemplate/EventTemplate";
import {fetchAppointmentList} from "../../utils/api";

const TYPE_NEW = 'New';
let schedulerData;
class CustomScheduler extends Component{

    constructor(props){
        super(props);
        const selectedDate = props.dateState;
        schedulerData = new SchedulerData(selectedDate, ViewTypes.Day, false, false, {
            minuteStep: 30,
            eventItemHeight: 50,
            resourceName: 'STAFF NAME',
            eventItemLineHeight: 55,
            dayCellWidth: 120,
            dayStartFrom: 9 ,
            dayStopTo: 18
        });
        // let appointmentList = this.getAppointmentList(props.appointmentList);
        // let staffList = this.getResources(props.staffList);
        // schedulerData.setResources(staffList);
        // schedulerData.setEvents(appointmentList);
        this.state = {
            viewModel: schedulerData,
            selectedDate: selectedDate
        }
    }

    getAppointmentList(list) {
        return list.map((op) => {
                return {
                    id: op.id,
                    start: op.start_Date,
                    end: op.end_Date,
                    // resizable: false,
                    resourceId: op.employee_Id,
                    title: op.customer_Name,
                    age: op.customer_Age,
                    type: 'Booked',
                    treatment_Name:op.treatment_Name,
                    treatment_Duration:op.treatment_Duration,
                    booked_Date:op.booked_Date,
                    probability:op.probability,
                    confirmationProbability:op.waitListConfirmationProbality,
                    // movabable: false,
                    bgColor: getProbabilityMeterColor(op.probability)
                }
            }
        );
    }

    componentDidMount() {
       const dateVar= this.fetchAndSetAppointmentList(this.props.dateState);
    }

    async fetchAndSetAppointmentList(selectedDate) {
        const fetchApp=await fetchAppointmentList(selectedDate).then(data => {
            this.props.setAppointment(data['appointments']);
            this.props.setStaff(data['employees']);
            this.props.setCustomer(data['appointments']);
            let appointmentList = this.getAppointmentList(data['appointments']);
            let staffList = this.getResources(data['employees']);
            schedulerData.setResources(staffList);
            schedulerData.setEvents(appointmentList);
            this.setState({
                viewModel: schedulerData,
                selectedDate: this.props.dateState
            });
        });
        return fetchApp;
    }

    componentWillReceiveProps (newProps) {
        if( newProps.appointmentList!== this.props.appointmentList || newProps.staffList!== this.props.staffList) {
            let appointmentList = this.getAppointmentList(this.props.appointmentList);
            let staffList = this.getResources(this.props.staffList);
            schedulerData.setResources(staffList);
            schedulerData.setEvents(appointmentList);
            this.setState({
                viewModel: schedulerData,
                selectedDate: this.props.dateState
            });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.dateState !== this.state.selectedDate) {
            let appointmentList = this.getAppointmentList(this.props.appointmentList);
            let staffList = this.getResources(this.props.staffList);
            schedulerData.setResources(staffList);
            schedulerData.setEvents(appointmentList);
            this.setState({
                viewModel: schedulerData,
                selectedDate: this.props.dateState
            });
        }
    }

    getResources(list){
        const resource = [];
        list.forEach((list) => {
            const temp = {id:list.employeeId, name: list.employeeName};
            resource.push(temp);
        });
        return resource;
    }

    render(){
        const {viewModel} = this.state;
        return (
            <div>
                {/*<div>HELLO<AlertDialog/></div>*/}
                    <Scheduler schedulerData={viewModel}
                               prevClick={this.prevClick}
                               nextClick={this.nextClick}
                               onSelectDate={this.onSelectDate}
                               onViewChange={this.onViewChange}
                               eventItemClick={this.eventClicked}
                               updateEventStart={this.updateEventStart}
                               eventItemTemplateResolver={this.eventItemTemplateResolver}
                               eventItemPopoverTemplateResolver={this.eventItemPopoverTemplateResolver}
                               updateEventEnd={this.updateEventEnd}
                               moveEvent={this.moveEvent}
                               newEvent={this.newEvent}
                    />
            </div>
        )
    }

    prevClick = (schedulerData)=> {
        schedulerData.prev();
        this.fetchAndSetAppointmentList(schedulerData.startDate);
        this.props.selectDate(schedulerData.startDate);
        const {viewModel} = this.state;
        schedulerData.setEvents(viewModel.events);

        this.setState({
            viewModel: schedulerData
        })
    };

    nextClick = (schedulerData)=> {
        schedulerData.next();
        this.fetchAndSetAppointmentList(schedulerData.startDate);
        const {viewModel} = this.state;
        this.props.selectDate(schedulerData.startDate);
        schedulerData.setEvents(viewModel.events);
        this.setState({
            viewModel: schedulerData
        })
    };

    onViewChange = (schedulerData, view) => {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        const {viewModel} = this.state;
        schedulerData.setEvents(viewModel.events);
        this.setState({
            viewModel: schedulerData
        })
    };

    onSelectDate = (schedulerData, date) => {
        this.fetchAndSetAppointmentList(date);
        schedulerData.setDate(date);
        this.props.selectDate(schedulerData.startDate);
        const {viewModel} = this.state;
        schedulerData.setEvents(viewModel.events);
        this.setState({
            viewModel: schedulerData
        })
    };

    eventClicked = (schedulerData, event) => {
        console.log(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
        // return (<AlertDialog/>);
        alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);

    };

    newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
        let newFreshId = 0;
        schedulerData.events.forEach((item) => {
            if(item.id >= newFreshId) {
                newFreshId = item.id + 1;
            }

        });
        let newEvent = {
            id: newFreshId,
            title: 'New Booking',
            start: start,
            end: end,
            type: TYPE_NEW,
            staffName: slotName,
            resourceId: slotId,
            bgColor: PURPLE
        };
        schedulerData.addEvent(newEvent);
        this.setState({
            viewModel: schedulerData
        })
    };

    updateEventStart = (schedulerData, event, newStart) => {
        schedulerData.updateEventStart(event, newStart);
        this.setState({
            viewModel: schedulerData
        })
    };

    updateEventEnd = (schedulerData, event, newEnd) => {
        schedulerData.updateEventEnd(event, newEnd);
        this.setState({
            viewModel: schedulerData
        })
    };

    moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
        schedulerData.moveEvent(event, slotId, slotName, start, end);
        this.setState({
            viewModel: schedulerData
        })
    };

    eventItemTemplateResolver = (schedulerData, event, bgColor, isStart, isEnd, mustAddCssClass, mustBeHeight, agendaMaxEventWidth) => {
        return eventTemplate(isStart, bgColor, schedulerData, event, mustBeHeight, agendaMaxEventWidth, mustAddCssClass);
    };

    eventItemPopoverTemplateResolver = (schedulerData, eventItem, title, start, end, statusColor) => {
        let borderColor = getBorderColor(statusColor);
        if (eventItem.type === TYPE_NEW) {
            return (<NewEventPopover
                eventItem={eventItem}
                title={title}
                start={start}
                end={end}
                customerList={this.props.customerList}
                fetchAndSetAppointmentList={(date)=>this.fetchAndSetAppointmentList(date)}
                serviceList={this.props.serviceList}
                 />)
        }
        return (
            existingEventPopOver(borderColor, eventItem, title, start, end)
        );
    };
}

export default withDragDropContext(CustomScheduler)
