import Row from "antd/lib/row";
import Col from "antd/lib/col";
import DeleteIcon from "@material-ui/icons/Delete";
import {RED} from "../../Constant/color";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import React from "react";

export const existingEventPopOver = (borderColor, eventItem, title, start, end) => {
    return (
        <div style={{width: '300px', borderLeft: '10px solid ' + borderColor}}>
        <Row type="flex" align="middle">
            <Col span={2}>
                {/*<div className="status-dot" style={{backgroundColor: statusColor}} />*/}
            </Col>
            <Col span={22} className="overflow-text">
                <span className="header2-text" title={eventItem.title}>Name : </span>
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
                              onClick={() => this.deleteButtonClicked(eventItem)}
                              style={{color: RED, cursor: 'pointer', paddingLeft: 12, border: RED}}>
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
