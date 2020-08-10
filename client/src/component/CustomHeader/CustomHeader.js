
import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';

const CustomHeader = (props) => {
    return(
        <AppBar position="static">
            <Toolbar>
                <img src={"./smarter-logo.svg" } />
                <Typography class={"brand"}>
                    <div className={"BrandName"}>Smarter</div>
                    <div className={"StudioName"}>Chenz Salon and Spa, Pune (IN)</div>
                </Typography>
                <SettingsIcon style={{position: 'absolute', right: 30}} onClick={()=>props.toggleIsAdmin()}/>
            </Toolbar>
        </AppBar>)
};

export default CustomHeader;
