import Row from "antd/lib/row";
import Col from "antd/lib/col";
import DeleteIcon from "@material-ui/icons/Delete";
import {DARK_RED, RED} from "../../../Constant/color";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import React from "react";

export const existingEventPopOver = (borderColor, eventItem, title, start, end) => {

    const deleteButtonClicked = eventItem => {
        alert(`You just clicked deleteButtonClicked button. event title: ${eventItem.title}`);
    };
const formattedDate=new Date(eventItem.booked_Date);
    return (
        <div style={{width: '300px'}}>
       <Row type="flex" align="middle">
            <Col span={2}>
                {/*<div className="status-dot" style={{backgroundColor: statusColor}} />*/}
            </Col>
            <Col span={22} className="overflow-text">
                <span className="header2-text" title={eventItem.customer_Name}>Name : </span>
                <span className="header2-text" title={title}>{title}</span>
            </Col>
        </Row>
        <Row type="flex" align="middle">
            <Col span={2}/>
            <Col span={22} className="overflow-text">
                <span className="header2-text" title={eventItem.age}>Age : </span>
                <span className="header2-text" title={eventItem.age}>{eventItem.age}</span>
            </Col>
        </Row>
        <Row type="flex" align="middle">
            <Col span={2}>
                {/*<div className="status-dot" style={{backgroundColor: statusColor}} />*/}
            </Col>
            <Col span={22} className="overflow-text">
                <span className="header2-text" title={eventItem.treatment_Name}>Treatment : </span>
                <span className="header2-text" title={eventItem.treatment_Name}>{eventItem.treatment_Name}</span>
            </Col>
        </Row>
        <Row type="flex" align="middle">
            <Col span={2}>
                {/*<div className="status-dot" style={{backgroundColor: statusColor}} />*/}
            </Col>
            <Col span={22} className="overflow-text">
                <span className="header2-text" title={eventItem.treatment_Duration}>Treatment Duration : </span>
                <span className="header2-text" title={eventItem.treatment_Duration}>{eventItem.treatment_Duration} Mins</span>
            </Col>
        </Row>
        <Row type="flex" align="middle">
            <Col span={2}>
                {/*<div className="status-dot" style={{backgroundColor: statusColor}} />*/}
            </Col>
            <Col span={22} className="overflow-text">
                <span className="header2-text" title={eventItem.booked_Date}>Booking Date : </span>
                <span className="header2-text" title={eventItem.booked_Date}>{formattedDate.toDateString()}</span>
            </Col>
        </Row>
        <Row type="flex" align="middle">
            <Col span={2}>
                {/*<div className="status-dot" style={{backgroundColor: statusColor}} />*/}
            </Col>
            <Col span={22} className="overflow-text">
                <span className="header2-text" title={eventItem.probability}>No-Show Probability : </span>
                <span className="header2-text" title={eventItem.probability}>{eventItem.probability.toFixed(2)}%</span>
            </Col>
        </Row>
        <Row type="flex" align="middle">
            <Col span={2}>
                {/*<div className="status-dot" style={{backgroundColor: statusColor}} />*/}
            </Col>
            <Col span={22} className="overflow-text">
                <span className="header2-text" title={eventItem.probability}>Confirmation Probability : </span>
                <span className="header2-text" title={eventItem.probability}>{eventItem.probability.toFixed(2)}%</span>
            </Col>
        </Row>
        <Row type="flex" align="middle">
            <Col span={2}>
                <div/>
            </Col>
            <Col span={22}>
                <span className="header1-text">{start.format("HH:mm")} - {end.format("HH:mm")}</span>
            </Col>
        </Row>
        <Row type="flex" align="middle">
            <Col span={1}>
                <div/>
            </Col>
            <Col span={1}>
                <DeleteIcon/>
            </Col>
            <Col span={10}>
                        <span className="header2-text"
                              onClick={() => deleteButtonClicked(eventItem)}
                              style={{color: DARK_RED, cursor: 'pointer', paddingLeft: 12, border: RED}}>
                            Delete
                        </span>

            </Col>
            <Col span={1}>
                <div/>
            </Col>
            <Col span={1}>
                <AddAlertIcon/>
            </Col>
            <Col span={10}>
                    <span className="header2-text"
                          style={{color: "#108ee9", paddingLeft: 12, cursor: 'pointer'}}>Reminder</span>
            </Col>
        </Row>
    </div>
    );
};
