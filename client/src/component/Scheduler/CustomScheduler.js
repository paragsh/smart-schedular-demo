import React, {Component} from 'react'
import Scheduler, {SchedulerData, ViewTypes } from 'react-big-scheduler';
import withDragDropContext from './withDnDContext';
import 'react-big-scheduler/lib/css/style.css';

import {
    getBorderColor, getProbabilityMeterColor,
    PURPLE,
} from "../../Constant/color";
import AlertDialog from "../NewEventModal/NewEventModal";
import {newEventPopover} from "./NewEventPopOver";
import {existingEventPopOver} from "./ExistingEventPopOver";
import {eventSchedulerTemplate} from "./eventSchedulerTemplate";

class CustomScheduler extends Component{
    constructor(props){
        super(props);
        let schedulerData = new SchedulerData('2020-08-15', ViewTypes.Day, false, false, {
            minuteStep: 15,
            eventItemHeight: 33,
            resourceName: 'STAFF NAME',
            eventItemLineHeight: 36,
            dayCellWidth: 120,
            dayStartFrom: 9 ,
            dayStopTo: 18
        });
        let appointmentList = this.getAppointmentList(props.appointmentList);
        let staffList = this.getResources(props.staffList);
        schedulerData.setResources(staffList);
        schedulerData.setEvents(appointmentList);
        this.state = {
            viewModel: schedulerData
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
                    // movabable: false,
                    bgColor: getProbabilityMeterColor(op.probability)
                }
            }
        );
    }

    getResources(list){
        const resource = [{
            id: 'base',
            name: '',
            groupOnly: true
        }];
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
                               viewEventClick={this.ops1}
                               viewEventText="Delete"
                               viewEvent2Text="Reminder"
                               viewEvent2Click={this.ops2}
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
        const {viewModel} = this.state;
        schedulerData.setEvents(viewModel.events);
        this.setState({
            viewModel: schedulerData
        })
    };

    nextClick = (schedulerData)=> {
        schedulerData.next();
        const {viewModel} = this.state;
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
        schedulerData.setDate(date);
        const {viewModel} = this.state;
        schedulerData.setEvents(viewModel.events);        this.setState({
            viewModel: schedulerData
        })
    };

    eventClicked = (schedulerData, event) => {
        console.log(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
        // return (<AlertDialog/>);
        alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);

    };

    ops1 = (schedulerData, event) => {
        alert(`You just executed DELETE event: {id: ${event.id}, title: ${event.title}}`);
    };

    ops2 = (schedulerData, event) => {
        alert(`You just executed REMINDER to event: {id: ${event.id}, title: ${event.title}}`);
    };

    newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
        console.log(type, item);
        let newFreshId = 0;
        schedulerData.events.forEach((item) => {
            if(item.id >= newFreshId)
                newFreshId = item.id + 1;
        });

        let newEvent = {
            id: newFreshId,
            title: 'Enter Booking Details',
            start: start,
            end: end,
            type: 'New',
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
        return eventSchedulerTemplate(isStart, bgColor, schedulerData, event, mustBeHeight, agendaMaxEventWidth, mustAddCssClass);
    };

    eventItemPopoverTemplateResolver = (schedulerData, eventItem, title, start, end, statusColor) => {
        let borderColor = getBorderColor(statusColor);
        if (eventItem.type === 'New') {
            return (
            newEventPopover(eventItem, title, start, end))
        }
        return (
            existingEventPopOver(borderColor, eventItem, title, start, end)
        );
    };

    deleteButtonClicked = (eventItem) => {
        alert(`You just clicked deleteButtonClicked button. event title: ${eventItem.title}`);
    };

    saveButtonClicked = (eventItem) => {
        alert(`You just clicked saveButtonClicked button. event title: ${eventItem.title}`);
    };
}

export default withDragDropContext(CustomScheduler)
