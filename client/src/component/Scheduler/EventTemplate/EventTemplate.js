import {getBorderColor} from "../../../Constant/color";
import HourglassEmptyRoundedIcon from '@material-ui/icons/HourglassEmptyRounded';
import React from "react";
import {CLEANING, TYPE_NEW} from "../../../Constant/ActionType";
import AlarmIcon from '@material-ui/icons/Alarm';

export const eventTemplate = (isStart, bgColor, schedulerData, event, mustBeHeight, agendaMaxEventWidth, mustAddCssClass) => {
    let borderWidth = isStart ? '4' : '0';
    let backgroundColor = bgColor;
    let borderColor = getBorderColor(bgColor);
    let titleText = schedulerData.behaviors.getEventTextFunc(schedulerData, event);
    let treatmentName = event['treatment_Name'];
    let shouldShowIcon = event['confirmationProbability'] > 0;
    let disc = event['disc'];
    let divStyle = {
        borderLeft: borderWidth + 'px solid ' + borderColor,
        backgroundColor: backgroundColor,
        height: mustBeHeight,
        marginLeft: '4px',
        fontSize:12,
        color: 'black',
        ontFamily: "Open Sans"
    };
    if (!!agendaMaxEventWidth)
        divStyle = {...divStyle, maxWidth: agendaMaxEventWidth};

    if(event.type === CLEANING) {
        return (
            <div key={event.id} className={mustAddCssClass} style={divStyle}>
                <div style={{paddingTop: 13, opacity: 0.5} }>
                    <span><AlarmIcon/></span>
                </div>
            </div>
        )
    }

    if(event.type === TYPE_NEW) {
        return (
            <div key={event.id} className={mustAddCssClass} style={divStyle}>
                <div style={{paddingTop: 5, whiteSpace: 'pre-line'} }>
                    <span>New Booking</span>
                </div>
            </div>
        )
    }

    return (<div key={event.id} className={mustAddCssClass} style={divStyle}>
        {shouldShowIcon && <HourglassEmptyRoundedIcon class={"waitIcon"} />}
                <div style={{ paddingTop: 5}}>
                    <span>{titleText}</span>
                    <span class={disc?"discTooltip":""}>{disc}</span>
                </div>
                <div style={{marginTop:2, opacity:.7}}>
                    <span>{treatmentName}</span>
                </div>
         </div>);
}
