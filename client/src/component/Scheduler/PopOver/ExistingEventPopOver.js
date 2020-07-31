import Row from "antd/lib/row";
import Col from "antd/lib/col";
import DeleteIcon from "@material-ui/icons/Delete";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import React from "react";
import  "./PopOverCss.css";
import AlarmIcon from '@material-ui/icons/Alarm';
import Button from '@material-ui/core/Button';
import TodayIcon from '@material-ui/icons/Today';


export const existingEventPopOver = (borderColor, eventItem, title, start, end) => {
const showConfirmationProbability=eventItem.confirmationProbability!=0?'block':'none';
    const deleteButtonClicked = eventItem => {
        alert(`You just clicked deleteButtonClicked button. event title: ${eventItem.title}`);
    };
const formattedDate=new Date(eventItem.booked_Date);
const startDate=new Date(eventItem.start);
    return (
    <div className="popOverCss" >
       <Row type="flex" align="middle">
            <Col span={2}>
                {/*<div className="status-dot" style={{backgroundColor: statusColor}} />*/}
            </Col>
            <Col span={22} className="Name">
                <span  title={title}>{title}</span>
            </Col>
        </Row>
        <Row type="flex" align="middle">
            <Col span={2}>
                {/*<div className="status-dot" style={{backgroundColor: statusColor}} />*/}
            </Col>
            <Col span={22}>
                <span className="NoShowTitle" title={eventItem.probability}>No-Show Probability- </span>
                <span className="NoShowValue" title={eventItem.probability}>{eventItem.probability.toFixed(2)}%</span>
            </Col>
        </Row>

        <Row type="flex" align="middle" style={{display:showConfirmationProbability
        }}>
            <Col span={2}>
                {/*<div className="status-dot" style={{backgroundColor: statusColor}} />*/}
            </Col>
            <Col span={22}>
                <span className="NoShowTitle" title={eventItem.confirmationProbability}>Confirmation Probability- </span>
                <span className="NoShowValue" title={eventItem.confirmationProbability}>{eventItem.confirmationProbability.toFixed(2)}%</span>
            </Col>
        </Row>
        <Row type="flex" align="middle">
            <Col span={2}>
                {/*<div className="status-dot" style={{backgroundColor: statusColor}} />*/}
            </Col>
            <Col span={22} className="BokkingDate">
                <span  title={eventItem.booked_Date}>Booking Date - </span>
                <span  title={eventItem.booked_Date}>{formattedDate.toDateString()}</span>
            </Col>
        </Row>

        <Row type="flex" align="middle">
            <Col span={2}>
                {/*<div className="status-dot" style={{backgroundColor: statusColor}} />*/}
            </Col>
            <Col span={22} className="Line">
            </Col>
        </Row>

        <Row type="flex" align="middle">
            <Col span={2}>
                {/*<div className="status-dot" style={{backgroundColor: statusColor}} />*/}
            </Col>
            <Col span={22} className="Treatment">
                <span  title={eventItem.treatment_Name}>{eventItem.treatment_Name}</span>
            </Col>
        </Row>

        <Row type="flex" align="middle">
            <Col span={2}>

            </Col>
            <Col span={22} className="BokkingDate"><TodayIcon/>
                <span  title={eventItem.booked_Date}>Appointment Date - </span>
                <span  title={eventItem.booked_Date}>{startDate.toDateString()}</span>
            </Col>
        </Row>

        <Row type="flex" align="middle">
            <Col span={2}>
                {/*<div className="status-dot" style={{backgroundColor: statusColor}} />*/}
            </Col>
            <Col span={22} className="Duration">
                <span  ><AlarmIcon></AlarmIcon> </span>
                <span className="header2-text" title={eventItem.treatment_Duration}>{start.format("HH:mm")} to {end.format("HH:mm")} ({eventItem.treatment_Duration} Mins)</span>
            </Col>
        </Row>
        <hr className="Line"/>

        <Row type="flex" >
                <Col span={2}>
                    <div/>
                </Col>
                <Col span={10}>
                    <Button  variant="contained" size="small"
                             onClick={() => deleteButtonClicked(eventItem)}>
                        Cancel Booking
                    </Button>
                </Col>
                <Col span={11}>
                <Button  variant="contained" size="small" startIcon={<AddAlertIcon />}>
                        Send Reminder
                    </Button>
                </Col>
            </Row>
            <Row type="flex" align="middle">
            <Col span={2}>
                {/*<div className="status-dot" style={{backgroundColor: statusColor}} />*/}
            </Col>
            <Col span={19} className="ConfirmationPending">
                <span >Confirmation Pending</span>
            </Col>
            <Col span={3}>
                {/*<div className="status-dot" style={{backgroundColor: statusColor}} />*/}
            </Col>
        </Row>
    </div>
    );
};
