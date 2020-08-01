import Row from "antd/lib/row";
import Col from "antd/lib/col";
import DeleteIcon from "@material-ui/icons/Delete";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import ErrorOutlineRoundedIcon from '@material-ui/icons/ErrorOutlineRounded';
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
        <Row type="flex" align="middle" className="NoShowBlock" >
            <Col span={24}>
                <span className="NoShowTitle bodyText" title={eventItem.probability}>No-Show Probability: </span>
                <span className="NoShowValue bodyText" title={eventItem.probability}>{eventItem.probability.toFixed(2)}%</span>
            </Col>
        </Row>

        <Row type="flex" align="middle"  className="ShowConfirmBlock"  style={{display:showConfirmationProbability
        }}>
            <Col span={24}>
                <span className="NoShowTitle bodyText" title={eventItem.confirmationProbability}>Confirmation Probability: </span>
                <span className="NoShowValue colorGreen bodyText" title={eventItem.confirmationProbability}>{eventItem.confirmationProbability.toFixed(2)}%</span>
            </Col>
        </Row>
        <Row type="flex" align="middle">
            <Col span={22} className="nameTitle">
                <span  title={title}>{title}</span>
            </Col>
            <Col span={2}>
                {/* <div className="status-dot" style={{backgroundColor: statusColor}} /> */}
            </Col>
        </Row>
        <Row type="flex" align="middle">
            <Col span={24} className="BokkingDate bodyText">
                <span  title={eventItem.booked_Date}>Booking Date: </span>
                <span  title={eventItem.booked_Date}>{formattedDate.toDateString()}</span>
            </Col>
        </Row>

        <Row type="flex" align="middle">
            <Col span={24} className="Treatment nameTitle">
                <span className="serviceName">Service</span>
                <span title={eventItem.treatment_Name}>{eventItem.treatment_Name}</span>
            </Col>
        </Row>

        <Row type="flex" align="middle">
            <Col span={24} className="SessionDate bodyText">
                <TodayIcon className="mbIcon" />
                <span  title={eventItem.booked_Date}>Appointment Date: </span>
                <span className="textLable" title={eventItem.booked_Date}>{startDate.toDateString()}</span>
            </Col>
        </Row>

        <Row type="flex" align="middle">
            <Col span={24} className="Duration bodyText">
                <AlarmIcon className="mbIcon" />
                <span title={eventItem.booked_Date}>Appointment Time: </span>
                <span className="textLable" title={eventItem.treatment_Duration}>{start.format("HH:mm")} to {end.format("HH:mm")} ({eventItem.treatment_Duration} Mins)</span>
            </Col>
        </Row>

        <Row type="flex" className="btn" >
                <Col span={24}>
                    <Button className="btn-black" variant="contained" size="small"
                             onClick={() => deleteButtonClicked(eventItem)}>
                        Cancel Booking
                    </Button>
                <Button className="btn-blue" variant="contained" size="small">
                    <AddAlertIcon className="btn-icon" /> Send Reminder
                    </Button>
                </Col>
            </Row>
            <Row type="flex" align="middle">
                <Col span={24} className="ConfirmationPending">
                    <span> <ErrorOutlineRoundedIcon className="mbIcon" />Confirmation Pending...</span>
                </Col>
                <Col span={24} className="AppointmentConfirmed">
                    <span> <CheckCircleOutlineRoundedIcon className="mbIcon" />Appointment Confirmed!</span>
                </Col>
        </Row>
    </div>
    );
};
