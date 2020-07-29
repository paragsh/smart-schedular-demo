import {DARK_RED} from "../../../Constant/color";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import React from "react";
import SaveIcon from '@material-ui/icons/Save';

export const newEventPopover = (eventItem, title, start, end, customerList, serviceList) => {

    const saveButtonClicked = (eventItem) => {
        alert(`You just clicked saveButtonClicked button. event title: ${eventItem.title}`);
    };

    const serviceDropdown = serviceList.map(list => { return {value:list.name, label: list.name }})

    // const [currency, setCurrency] = useState('EUR');

    const handleChange = (event) => {
        // setCurrency(event.target.value);
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
                            <TextField required id="standard-required" label="Customer Name" margin="dense" defaultValue="Name"/>
                        </div>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={2}/>
                    <Col span={22} className="overflow-text">
                        <div>
                            <TextField
                                id="standard-select-currency"
                                select
                                label="Service"
                                margin="dense"
                                // value={'currency'}
                                onChange={handleChange}
                                helperText="Please select your Service"
                            >
                                {serviceDropdown.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
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
