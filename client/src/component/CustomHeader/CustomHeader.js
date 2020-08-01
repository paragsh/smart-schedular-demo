
import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from '@material-ui/core/Typography';

const CustomHeader = () => {
    return(
        <AppBar position="static">
            <Toolbar>
                <div class={"logo"}></div>
                <Typography class={"brand"}>
                    <div class={"BrandName"}>Smarter</div>
                    <div class={"StudioName"}>Chenz Salon and Spa, Pune (IN)</div>
                </Typography>
            </Toolbar>
        </AppBar>)
};

export default CustomHeader;
