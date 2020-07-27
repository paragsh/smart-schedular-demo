import React, {Component} from 'react'
import Scheduler, {SchedulerData, ViewTypes } from 'react-big-scheduler';
import withDragDropContext from './withDnDContext';
import 'react-big-scheduler/lib/css/style.css';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Button from 'antd/lib/button';

import {getColor} from "../../utils/Data.util";
import {DARK_GREEN, DARK_ORANGE, DARK_RED, ORANGE, RED} from "../../Constant/color";



class CustomScheduler extends Component{
    constructor(props){
        super(props);
        let schedulerData = new SchedulerData('2020-08-15', ViewTypes.Day, false, false, {
            minuteStep: 15,
            eventItemHeight: 33,
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
                    // movabable: false,
                    bgColor: getColor(op.probability)
                }
            }
        );
    }

    getResources(list){
        const resource = [{
            id: 'base',
            name: 'Staff Name',
            groupOnly: true
        }];
        list.forEach((list, index) => {
            const temp = {id:list.employeeId, name: list.employeeName};
            resource.push(temp);
        });
        return resource;
    }

    render(){
        const {viewModel} = this.state;
        return (
            <div>
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
                               // eventItemPopoverTemplateResolver={this.eventItemPopoverTemplateResolver}
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
    }

    nextClick = (schedulerData)=> {
        schedulerData.next();
        const {viewModel} = this.state;
        schedulerData.setEvents(viewModel.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    onViewChange = (schedulerData, view) => {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        const {viewModel} = this.state;
        schedulerData.setEvents(viewModel.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    onSelectDate = (schedulerData, date) => {
        schedulerData.setDate(date);
        const {viewModel} = this.state;
        schedulerData.setEvents(viewModel.events);        this.setState({
            viewModel: schedulerData
        })
    }

    eventClicked = (schedulerData, event) => {
        alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
    };

    ops1 = (schedulerData, event) => {
        alert(`You just executed DELETE event: {id: ${event.id}, title: ${event.title}}`);
    };

    ops2 = (schedulerData, event) => {
        alert(`You just executed REMINDER to event: {id: ${event.id}, title: ${event.title}}`);
    };

    newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
        let newFreshId = 0;
        schedulerData.events.forEach((item) => {
            if(item.id >= newFreshId)
                newFreshId = item.id + 1;
        });

        let newEvent = {
            id: newFreshId,
            title: 'New event you just created',
            start: start,
            end: end,
            resourceId: slotId,
            bgColor: 'purple'
        }
        schedulerData.addEvent(newEvent);
        this.setState({
            viewModel: schedulerData
        })
    }

    updateEventStart = (schedulerData, event, newStart) => {
        schedulerData.updateEventStart(event, newStart);
        this.setState({
            viewModel: schedulerData
        })
    }

    updateEventEnd = (schedulerData, event, newEnd) => {
        schedulerData.updateEventEnd(event, newEnd);
        this.setState({
            viewModel: schedulerData
        })
    }

    moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
        schedulerData.moveEvent(event, slotId, slotName, start, end);
        this.setState({
            viewModel: schedulerData
        })
    }

    eventItemTemplateResolver = (schedulerData, event, bgColor, isStart, isEnd, mustAddCssClass, mustBeHeight, agendaMaxEventWidth) => {
        let borderWidth = isStart ? '4' : '0';
        let borderColor , backgroundColor = bgColor;
        if(bgColor === RED) {
            borderColor = DARK_RED;
        }else if(bgColor === ORANGE) {
            borderColor = DARK_ORANGE;
        } else {
            borderColor = DARK_GREEN;
        }
        let titleText = schedulerData.behaviors.getEventTextFunc(schedulerData, event);
        let divStyle = {borderLeft: borderWidth + 'px solid ' + borderColor, backgroundColor: backgroundColor, height: mustBeHeight };
        if(!!agendaMaxEventWidth)
            divStyle = {...divStyle, maxWidth: agendaMaxEventWidth};

        return <div key={event.id} className={mustAddCssClass} style={divStyle}>
            <span style={{marginLeft: '4px', lineHeight: `${mustBeHeight}px` }}>{titleText}</span>
        </div>;
    }

    eventItemPopoverTemplateResolver = (schedulerData, eventItem, title, start, end, statusColor) => {
        return (
            <div style={{width: '300px'}}>
                <Row type="flex" align="middle">
                    <Col span={2}>
                        <div className="status-dot" style={{backgroundColor: statusColor}} />
                    </Col>
                    <Col span={22} className="overflow-text">
                        <span className="header2-text" title={title}>{title}</span>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={2}>
                        <div />
                    </Col>
                    <Col span={22}>
                        <span className="header1-text">{start.format("HH:mm")} - {end.format("HH:mm")}</span>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={2}>
                        <div />
                    </Col>
                    <Col span={22}>
                        <Button onClick={()=>{this.demoButtonClicked(eventItem);}}>Demo</Button>
                    </Col>
                </Row>
            </div>
        );
    };

    demoButtonClicked = (eventItem) => {
        alert(`You just clicked demo button. event title: ${eventItem.title}`);
    }
}

export default withDragDropContext(CustomScheduler)
