
import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from '@material-ui/core/Typography';

const CustomHeader = () => {
    return(
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    {/*<MenuIcon />*/}
                </IconButton>
                <Typography variant="h3">
                    Smart Scheduler
                </Typography>
                {/*<Button color="inherit">Login</Button>*/}
            </Toolbar>
        </AppBar>)
};

export default CustomHeader;
