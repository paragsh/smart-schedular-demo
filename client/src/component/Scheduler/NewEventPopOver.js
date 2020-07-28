import {DARK_PURPLE, RED} from "../../Constant/color";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import TextField from "@material-ui/core/TextField";
import React from "react";

export const newEventPopover = (eventItem, title, start, end) => {
    return (
        <div style={{width: '600px', borderLeft: '10px solid ' + DARK_PURPLE}}>
        <Row type="flex" align="middle" style={{width: '600px', height: '40px'}}>
            <Col span={2}>
                {/*<div className="status-dot" style={{backgroundColor: statusColor}} />*/}
            </Col>
            <Col span={22} className="overflow-text">
                <span className="header2-text" title={eventItem.title}/>
                <span className="header2-text" title={title}>{title}</span>
            </Col>
        </Row>
        <Row type="flex" align="middle">
            <Col span={2}/>
            <Col span={22} className="overflow-text">
                <form noValidate autoComplete="off">
                    <div>
                        <TextField required id="standard-required" label="Customer Name" defaultValue="Name"/>
                        <TextField required id="standard-required" label="Service Name" defaultValue="Service"/>
                    </div>
                </form>

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
            <Col span={2}>
                <div/>
            </Col>
            <Col span={10}>
                        <span className="header2-text"
                              onClick={() => this.saveButtonClicked(eventItem)}
                              style={{color: RED, cursor: 'pointer', border: RED}}>
                            Save
                        </span>
            </Col>
            <Col span={2}>
                <div/>
            </Col>
            <Col span={10}>
                <span className="header2-text" style={{color: "#108ee9", cursor: 'pointer'}}>Cancel</span>
            </Col>
        </Row>
    </div>);
}
