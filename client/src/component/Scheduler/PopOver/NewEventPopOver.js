import {DARK_RED} from "../../../Constant/color";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import React, {useState} from "react";
import SaveIcon from '@material-ui/icons/Save';
import Autocomplete from '@material-ui/lab/Autocomplete';

export const newEventPopover = (eventItem, title, start, end, customerList, serviceList) => {

    const saveButtonClicked = (eventItem) => {
        alert(`You just clicked saveButtonClicked button. event title: ${eventItem.title}`);
    };


    return (
        <div style={{width: '600px'}}>
            <Row type="flex" align="middle" style={{width: '600px', height: '40px'}}>
                <Col span={2}>
                    {/*<div className="status-dot" style={{backgroundColor: statusColor}} />*/}
                </Col>
                <Col span={22} className="overflow-text">
                    <span className="header2-text" title={eventItem.title}/>
                    <span className="header2-text" title={title}>{title}</span>
                </Col>
            </Row>
            <form noValidate autoComplete="off">
                <Row type="flex" align="middle">
                    <Col span={2}/>
                    <Col span={22} className="overflow-text">
                        <div>
                            <Autocomplete
                                id="combo-box-demo"
                                options={customerList}
                                getOptionLabel={(option) => option['customer_Name']}
                                style={{ width: 300 }}
                                size="small"
                                renderInput={(params) => <TextField {...params} margin="normal" label="Customer Name" variant="outlined" />}
                            />
                        </div>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={2}/>
                    <Col span={22} className="overflow-text">
                        <div>
                            <Autocomplete
                                id="combo-box-demo"
                                options={serviceList}
                                size="small"
                                getOptionLabel={(option) => option['name']}
                                style={{ width: 300 }}
                                renderInput={(params) => <TextField {...params}  margin="normal"  label="Service" variant="outlined" />}
                            />
                        </div>
                    </Col>
                </Row>
                <Row type="flex" align="middle" style={{paddingTop: 10}}>
                    <Col span={2}/>
                    <Col span={22} className="overflow-text">
                        <div>
                            <span className="header2-text">Duration : </span>
                            <span className="header1-text">45 mins</span>
                        </div>
                    </Col>
                </Row>

            </form>

            <Row type="flex" align="middle">
                <Col span={2}>
                    <div/>
                </Col>
                <Col span={22}>
                    <span className="header2-text">Appointment Time : </span>
                    <span className="header1-text">{start.format("HH:mm")}</span>
                </Col>
            </Row>
            <Row type="flex" align="middle" style={{paddingTop:10}}>
                <Col span={2}>
                    <div/>
                </Col>
                <Col span={10}>
                    <Button variant="contained"  startIcon={<SaveIcon />}
                             color="primary" onClick={() => saveButtonClicked(eventItem)}>
                        Save
                    </Button>
                </Col>
                <Col span={2}>
                    <div/>
                </Col>
                <Col span={10}>
                    <Button variant="outlined" color="secondary">
                        Cancel
                    </Button>
                </Col>
            </Row>
        </div>);
}
