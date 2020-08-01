import {getBorderColor} from "../../../Constant/color";
import React from "react";

export const eventTemplate = (isStart, bgColor, schedulerData, event, mustBeHeight, agendaMaxEventWidth, mustAddCssClass) => {
    let borderWidth = isStart ? '4' : '0';
    let backgroundColor = bgColor;
    let borderColor = getBorderColor(bgColor);
    let titleText = schedulerData.behaviors.getEventTextFunc(schedulerData, event);
    let treatmentName = event['treatment_Name'];
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

    return (<div key={event.id} className={mustAddCssClass} style={divStyle}>
                <div style={{ paddingTop: 5}}>
                    <span>{titleText}</span>
                </div>
                <div style={{marginTop:2, opacity:.7}}>
                    <span>{treatmentName}</span>
                </div>
         </div>);
}
